// ============================================
// SkillAnalyzer AI - AIChat.js
// ============================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    initializeAppCheck,
    ReCaptchaEnterpriseProvider
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-check.js";

import {
    getAI,
    getGenerativeModel,
    GoogleAIBackend
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-ai.js";


// ============================================
// FIREBASE CONFIG
// ============================================

const firebaseConfig = {
    apiKey: "AIzaSyAZVt5Y4OVUPMZel0oARdtKxZlT8L-ai34",
    authDomain: "skillanalyzer-373ae.firebaseapp.com",
    projectId: "skillanalyzer-373ae",
    storageBucket: "skillanalyzer-373ae.firebasestorage.app",
    messagingSenderId: "952710822091",
    appId: "1:952710822091:web:0f94738430db44219f834e"
};


// ============================================
// INITIALIZE FIREBASE
// ============================================

const app = initializeApp(firebaseConfig);

console.log("SkillAnalyzer AI: Firebase initialized.");


// ============================================
// APP CHECK
// ============================================
// ============================================
// APP CHECK
// ============================================

// Enable App Check debug mode for local development
if (
    location.hostname === "localhost" || 
    location.hostname === "127.0.0.1" || 
    location.hostname.startsWith("192.168.")
) {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    console.log("SkillAnalyzer AI: App Check debug mode active.");
}

initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
        "6LeNHNAtAAAAAN-yQbwQhQM4c-Sn2ZdMUng2jPxi"
    ),
    isTokenAutoRefreshEnabled: true
});

console.log("SkillAnalyzer AI: App Check initialized.");



// ============================================
// FIREBASE AI
// Replay Protection is enforced,
// so use limited-use App Check tokens.
// ============================================

const ai = getAI(app, {
    backend: new GoogleAIBackend(),
    useLimitedUseAppCheckTokens: true
});

const model = getGenerativeModel(ai, {
    model: "gemini-3.8-flash"
});

const chat = model.startChat();

console.log("SkillAnalyzer AI: AI model initialized.");


// ============================================
// HTML ELEMENTS
// ============================================

const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const suggestionButtons =
    document.querySelectorAll(".suggestions button");


// ============================================
// ADD MESSAGE
// ============================================

function addMessage(text, type) {

    const messageElement = document.createElement("div");

    messageElement.className = `message ${type}`;

    if (type === "bot") {

        const avatar = document.createElement("div");

        avatar.className = "avatar";
        avatar.textContent = "AI";

        const bubble = document.createElement("div");

        bubble.className = "bubble";
        bubble.textContent = text;

        messageElement.appendChild(avatar);
        messageElement.appendChild(bubble);

    } else {

        const bubble = document.createElement("div");

        bubble.className = "bubble";
        bubble.textContent = text;

        messageElement.appendChild(bubble);
    }

    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight;

    return messageElement;
}


// ============================================
// SEND MESSAGE
// ============================================

async function sendMessage(text) {

    text = text.trim();

    if (!text) {
        return;
    }

    // Show user message
    addMessage(text, "user");

    // Clear input
    userInput.value = "";

    // Disable controls
    sendBtn.disabled = true;
    userInput.disabled = true;

    // Show loading message
    const loadingMessage =
        addMessage("Thinking...", "bot");

    const loadingBubble =
        loadingMessage.querySelector(".bubble");

    try {

        console.log(
            "SkillAnalyzer AI: Sending message to Gemini..."
        );

        const result =
            await chat.sendMessage(text);

        console.log(
            "SkillAnalyzer AI: Gemini response received."
        );

        const responseText =
            result.response.text();

        if (responseText && responseText.trim()) {

            loadingBubble.textContent =
                responseText.trim();

        } else {

            loadingBubble.textContent =
                "The AI returned an empty response.";
        }

    } catch (error) {

        console.error(
            "SKILLANALYZER AI ERROR:",
            error
        );

        loadingBubble.textContent =
            "AI ERROR:\n\n" +
            (error?.message || String(error));

    } finally {

        sendBtn.disabled = false;
        userInput.disabled = false;

        userInput.focus();

        chatBox.scrollTop =
            chatBox.scrollHeight;
    }
}


// ============================================
// FORM SUBMIT
// ============================================

chatForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        sendMessage(userInput.value);
    }
);


// ============================================
// SUGGESTION BUTTONS
// ============================================

suggestionButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const question =
                    button.dataset.question;

                if (question) {
                    sendMessage(question);
                }
            }
        );
    }
);


// ============================================
// ENTER KEY
// ============================================

userInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            chatForm.requestSubmit();
        }
    }
);


// ============================================
// READY
// ============================================

console.log(
    "SkillAnalyzer AI is ready."
);
