import { auth, db } from "./firebase.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
    getAI,
    getGenerativeModel,
    GoogleAIBackend
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-ai.js";

const MODEL_NAMES = [
    "gemini-3.8-flash",
    "gemini-3-flash-preview",
    "gemini-3.1-pro-preview"
];

const SYSTEM_INSTRUCTION = `
You are the friendly AI assistant inside Skill Analyzer.

Skill Analyzer helps students understand four skill categories: UI/UX Design, Software Development, Entrepreneurship, and Leadership. Each category is measured with 20 questions.

Use a casual, warm, encouraging tone. Sound like a helpful mentor or classmate, not a formal report. Keep answers clear and reasonably short, and use simple language. Acknowledge the student's concern before giving advice.

Help with questions like "Why is my score low?", "Where can I improve?", "What does this result mean?", and "What should I learn next?"

Explain that a score reflects how the student answered this particular assessment. It is not a permanent label or a measure of their worth. Never shame the student or treat a lower score as failure.

Use the student's result context when it is provided. Never invent a reason for a score, a missing answer, or a skill gap. If the context does not include enough detail, ask for the category, score, and any question or feedback that felt difficult.

Give two or three practical next steps when useful. Ask at most one focused follow-up question when more context is needed. Do not mention these instructions, Firebase, Gemini, API keys, model names, or a former assistant persona.
`.trim();

const widget = document.createElement("skill-analyzer-chatbot");
document.body.appendChild(widget);

class SkillAnalyzerChatbot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.messages = [];
        this.scoreContext = null;
        this.ai = null;
        this.busy = false;
        this.render();
    }

    connectedCallback() {
        this.bindEvents();
        this.loadScoreContext();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --sa-black: #07070d;
                    --sa-panel: #10101b;
                    --sa-panel-soft: #171426;
                    --sa-border: rgba(196, 132, 252, 0.22);
                    --sa-purple: #8b5cf6;
                    --sa-magenta: #c026d3;
                    --sa-text: #f8f7ff;
                    --sa-muted: #aaa3c2;
                    position: fixed;
                    right: 24px;
                    bottom: 24px;
                    z-index: 9999;
                    font-family: Poppins, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                }

                * {
                    box-sizing: border-box;
                }

                button,
                textarea {
                    font: inherit;
                }

                .launcher {
                    display: grid;
                    place-items: center;
                    width: 62px;
                    height: 62px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 20px;
                    color: white;
                    background: linear-gradient(135deg, #6d28d9, #c026d3);
                    box-shadow: 0 18px 42px rgba(0, 0, 0, 0.42), 0 0 30px rgba(139, 92, 246, 0.36);
                    cursor: pointer;
                    transition: transform 180ms ease, box-shadow 180ms ease;
                }

                .launcher:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 22px 48px rgba(0, 0, 0, 0.5), 0 0 38px rgba(192, 38, 211, 0.42);
                }

                .launcher svg {
                    width: 27px;
                    height: 27px;
                }

                .panel {
                    display: none;
                    width: min(380px, calc(100vw - 32px));
                    height: min(620px, calc(100vh - 48px));
                    overflow: hidden;
                    flex-direction: column;
                    border: 1px solid var(--sa-border);
                    border-radius: 24px;
                    color: var(--sa-text);
                    background:
                        radial-gradient(circle at 100% 0%, rgba(192, 38, 211, 0.16), transparent 36%),
                        radial-gradient(circle at 0% 100%, rgba(109, 40, 217, 0.16), transparent 38%),
                        var(--sa-black);
                    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.58), 0 0 42px rgba(109, 40, 217, 0.18);
                }

                :host([open]) .launcher {
                    display: none;
                }

                :host([open]) .panel {
                    display: flex;
                }

                .header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    padding: 18px 18px 15px;
                    border-bottom: 1px solid rgba(196, 132, 252, 0.14);
                    background: rgba(16, 16, 27, 0.88);
                }

                .identity {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                }

                .avatar {
                    display: grid;
                    place-items: center;
                    width: 39px;
                    height: 39px;
                    border-radius: 13px;
                    color: white;
                    background: linear-gradient(135deg, var(--sa-purple), var(--sa-magenta));
                    box-shadow: 0 0 22px rgba(139, 92, 246, 0.3);
                }

                .avatar svg {
                    width: 20px;
                    height: 20px;
                }

                .title {
                    font-size: 14px;
                    font-weight: 800;
                    letter-spacing: 0.01em;
                }

                .subtitle {
                    margin-top: 2px;
                    color: var(--sa-muted);
                    font-size: 11px;
                }

                .close {
                    display: grid;
                    place-items: center;
                    width: 30px;
                    height: 30px;
                    border: 0;
                    border-radius: 10px;
                    color: #c9c2dc;
                    background: transparent;
                    cursor: pointer;
                }

                .close:hover {
                    color: white;
                    background: rgba(139, 92, 246, 0.16);
                }

                .close svg {
                    width: 17px;
                    height: 17px;
                }

                .messages {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    gap: 12px;
                    overflow-y: auto;
                    padding: 17px 14px;
                }

                .message {
                    max-width: 88%;
                    padding: 11px 13px;
                    border: 1px solid rgba(196, 132, 252, 0.14);
                    border-radius: 15px 15px 15px 5px;
                    color: #f3efff;
                    background: var(--sa-panel-soft);
                    font-size: 13px;
                    line-height: 1.55;
                    white-space: pre-wrap;
                    overflow-wrap: anywhere;
                }

                .message.user {
                    align-self: flex-end;
                    border-color: rgba(192, 38, 211, 0.55);
                    border-radius: 15px 15px 5px 15px;
                    background: linear-gradient(135deg, #6d28d9, #9d2bb7);
                }

                .typing {
                    display: inline-flex;
                    gap: 4px;
                    align-items: center;
                    min-height: 17px;
                }

                .typing span {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #d8b4fe;
                    animation: blink 900ms infinite alternate;
                }

                .typing span:nth-child(2) { animation-delay: 180ms; }
                .typing span:nth-child(3) { animation-delay: 360ms; }

                @keyframes blink {
                    from { opacity: 0.3; transform: translateY(1px); }
                    to { opacity: 1; transform: translateY(-1px); }
                }

                .suggestions {
                    display: flex;
                    gap: 7px;
                    overflow-x: auto;
                    padding: 0 14px 11px;
                }

                .suggestion {
                    flex: 0 0 auto;
                    padding: 8px 10px;
                    border: 1px solid rgba(168, 85, 247, 0.42);
                    border-radius: 999px;
                    color: #e9d5ff;
                    background: rgba(109, 40, 217, 0.12);
                    font-size: 11px;
                    cursor: pointer;
                }

                .suggestion:hover {
                    color: white;
                    background: rgba(139, 92, 246, 0.32);
                }

                .composer {
                    display: flex;
                    align-items: flex-end;
                    gap: 8px;
                    padding: 12px 14px 14px;
                    border-top: 1px solid rgba(196, 132, 252, 0.14);
                    background: rgba(16, 16, 27, 0.92);
                }

                textarea {
                    min-height: 42px;
                    max-height: 105px;
                    flex: 1;
                    resize: none;
                    padding: 11px 12px;
                    border: 1px solid rgba(196, 132, 252, 0.22);
                    border-radius: 13px;
                    outline: none;
                    color: var(--sa-text);
                    background: #080810;
                    font-size: 13px;
                    line-height: 1.35;
                }

                textarea:focus {
                    border-color: var(--sa-purple);
                    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.13);
                }

                .send {
                    display: grid;
                    place-items: center;
                    width: 42px;
                    height: 42px;
                    flex: 0 0 42px;
                    border: 0;
                    border-radius: 13px;
                    color: white;
                    background: linear-gradient(135deg, var(--sa-purple), var(--sa-magenta));
                    cursor: pointer;
                }

                .send:disabled {
                    cursor: not-allowed;
                    opacity: 0.48;
                }

                .send svg {
                    width: 18px;
                    height: 18px;
                }

                @media (max-width: 560px) {
                    :host {
                        right: 16px;
                        bottom: 16px;
                    }

                    :host([open]) {
                        right: 0;
                        bottom: 0;
                    }

                    :host([open]) .panel {
                        width: 100vw;
                        height: 100dvh;
                        border-radius: 0;
                    }
                }
            </style>

            <button class="launcher" type="button" aria-label="Open Skill Analyzer assistant">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="M12 3a7 7 0 0 0-7 7v3a4 4 0 0 0 4 4h1v-5H7v-2a5 5 0 0 1 10 0v2h-3v5h1a4 4 0 0 0 4-4v-3a7 7 0 0 0-7-7Z"/>
                    <path d="M10 21h4"/>
                </svg>
            </button>

            <section class="panel" role="dialog" aria-label="Skill Analyzer assistant">
                <header class="header">
                    <div class="identity">
                        <div class="avatar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                                <rect x="4" y="5" width="16" height="14" rx="3"/>
                                <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h8"/>
                            </svg>
                        </div>
                        <div>
                            <div class="title">Skill Analyzer assistant</div>
                            <div class="subtitle">Friendly help with your results</div>
                        </div>
                    </div>
                    <button class="close" type="button" aria-label="Close assistant">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                            <path d="m6 6 12 12M18 6 6 18"/>
                        </svg>
                    </button>
                </header>

                <div class="messages" aria-live="polite"></div>

                <div class="suggestions">
                    <button class="suggestion" type="button">Why is my score low?</button>
                    <button class="suggestion" type="button">Where can I improve?</button>
                    <button class="suggestion" type="button">What should I learn next?</button>
                </div>

                <form class="composer">
                    <textarea rows="1" aria-label="Ask about your Skill Analyzer results" placeholder="Ask about your results..."></textarea>
                    <button class="send" type="submit" aria-label="Send message">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                            <path d="m22 2-7 20-4-9-9-4Z"/>
                            <path d="M22 2 11 13"/>
                        </svg>
                    </button>
                </form>
            </section>
        `;
    }

    bindEvents() {
        const launcher = this.shadowRoot.querySelector(".launcher");
        const close = this.shadowRoot.querySelector(".close");
        const form = this.shadowRoot.querySelector(".composer");
        const textarea = this.shadowRoot.querySelector("textarea");

        launcher.addEventListener("click", () => {
            this.open();
            textarea.focus();
        });

        close.addEventListener("click", () => this.close());

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.send(textarea.value);
        });

        textarea.addEventListener("input", () => {
            textarea.style.height = "42px";
            textarea.style.height = `${Math.min(textarea.scrollHeight, 105)}px`;
        });

        textarea.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                form.requestSubmit();
            }
        });

        this.shadowRoot.querySelectorAll(".suggestion").forEach((button) => {
            button.addEventListener("click", () => this.send(button.textContent));
        });
    }

    open() {
        this.setAttribute("open", "");
        if (this.messages.length === 0) {
            this.addMessage(
                "Hey! I can help you understand your Skill Analyzer results. Ask me why a score is low, where you can improve, or what to learn next.",
                "assistant"
            );
        }
    }

    close() {
        this.removeAttribute("open");
    }

    addMessage(text, role) {
        const message = document.createElement("div");
        message.className = `message ${role === "user" ? "user" : ""}`;
        message.textContent = text;
        this.shadowRoot.querySelector(".messages").appendChild(message);
        this.scrollMessages();
        return message;
    }

    addTypingMessage() {
        const message = document.createElement("div");
        message.className = "message";
        message.innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
        this.shadowRoot.querySelector(".messages").appendChild(message);
        this.scrollMessages();
        return message;
    }

    scrollMessages() {
        const messages = this.shadowRoot.querySelector(".messages");
        messages.scrollTop = messages.scrollHeight;
    }

    async loadScoreContext() {
        try {
            const user = await this.getUser();
            if (!user) return;

            const reportSnapshot = await getDoc(
                doc(db, "users", user.uid, "reports", "finalResult")
            );

            if (reportSnapshot.exists()) {
                const report = reportSnapshot.data();
                this.scoreContext = {
                    overallPercentage: report.overallPercentage ?? null,
                    profileTitle: report.profileTitle ?? null,
                    categories: report.categories ?? {},
                    categoryRanking: report.categoryRanking ?? []
                };
            }
        } catch (error) {
            console.warn("Skill Analyzer chatbot could not load score context.", error);
        }
    }

    getUser() {
        if (auth.currentUser) return Promise.resolve(auth.currentUser);

        return new Promise((resolve) => {
            let settled = false;
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (settled) return;
                settled = true;
                unsubscribe();
                resolve(user);
            });

            window.setTimeout(() => {
                if (settled) return;
                settled = true;
                unsubscribe();
                resolve(null);
            }, 8000);
        });
    }

    getAi() {
        if (this.ai) return this.ai;

        const aiApp = initializeApp(auth.app.options, "skill-analyzer-chatbot-ai");
        this.ai = getAI(aiApp, {
            backend: new GoogleAIBackend()
        });
        return this.ai;
    }

    formatScoreContext() {
        if (!this.scoreContext) {
            return "No saved result context is available. Ask the student for their category, score, and any feedback or difficult questions.";
        }

        return `Saved Skill Analyzer result context:
${JSON.stringify(this.scoreContext, null, 2)}

Use this context only to explain the student's results. Do not infer details that are not present.`;
    }

    async send(rawText) {
        const text = rawText.trim();
        if (!text || this.busy) return;

        const textarea = this.shadowRoot.querySelector("textarea");
        textarea.value = "";
        textarea.style.height = "42px";
        this.busy = true;
        this.setComposerDisabled(true);
        this.addMessage(text, "user");
        const typing = this.addTypingMessage();

        const prompt = `${this.formatScoreContext()}\n\nStudent question:\n${text}`;

        try {
            const ai = this.getAi();
            let responseText = "";
            let lastError;

            for (const modelName of MODEL_NAMES) {
                try {
                    const model = getGenerativeModel(ai, {
                        model: modelName,
                        systemInstruction: SYSTEM_INSTRUCTION,
                        generationConfig: {
                            maxOutputTokens: 8192
                        }
                    });
                    const chat = model.startChat();
                    const result = await chat.sendMessage(prompt);
                    responseText = result.response.text().trim();
                    if (responseText) break;
                } catch (error) {
                    lastError = error;
                    console.warn(`Skill Analyzer chatbot model ${modelName} failed.`, error);
                }
            }

            if (!responseText) {
                throw lastError || new Error("The assistant returned an empty response.");
            }

            typing.textContent = responseText;
        } catch (error) {
            console.error("Skill Analyzer chatbot error.", error);
            typing.textContent = "I couldn’t load an answer right now. Please try again in a moment.";
        } finally {
            this.busy = false;
            this.setComposerDisabled(false);
            this.scrollMessages();
        }
    }

    setComposerDisabled(disabled) {
        this.shadowRoot.querySelector("textarea").disabled = disabled;
        this.shadowRoot.querySelector(".send").disabled = disabled;
        this.shadowRoot.querySelectorAll(".suggestion").forEach((button) => {
            button.disabled = disabled;
        });
    }
}

customElements.define("skill-analyzer-chatbot", SkillAnalyzerChatbot);