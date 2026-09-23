import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
getAI,
getGenerativeModel,
GoogleAIBackend
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-ai.js";

const firebaseConfig = {
apiKey: "AIzaSyAZVt5Y4OVUPMZel0oARdtKxZlT8L-ai34",
authDomain: "skillanalyzer-373ae.firebaseapp.com",
projectId: "skillanalyzer-373ae",
storageBucket: "skillanalyzer-373ae.firebasestorage.app",
messagingSenderId: "952710822091",
appId: "1:952710822091:web:0f94738430db44219f834e"
};

const app = initializeApp(firebaseConfig);

const ai = getAI(app, {
backend: new GoogleAIBackend()
});

const model = getGenerativeModel(ai, {
model: "gemini-3.8-flash"
});

const chat = model.startChat({
systemInstruction: `
You are SkillAnalyzer AI, a friendly learning assistant for CSE students.

Your main areas are:

* Programming
* Python
* DSA
* Web development
* UI/UX
* AI and technology
* Projects
* Interview preparation
* Student career guidance

Give clear, practical and beginner-friendly explanations.

When explaining coding concepts, use simple examples and explain the logic.
Do not pretend to know a student's private SkillAnalyzer results unless those results are explicitly provided in the conversation.

Keep answers reasonably concise unless the student asks for more detail.
`
});

const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, type) {
const message = document.createElement("div");
message.className = `message ${type}`;

```
if (type === "bot") {
    message.innerHTML = `
        <div class="avatar">AI</div>
        <div class="bubble"></div>
    `;

    message.querySelector(".bubble").textContent = text;
} else {
    message.innerHTML = `
        <div class="bubble"></div>
    `;

    message.querySelector(".bubble").textContent = text;
}

chatBox.appendChild(message);
chatBox.scrollTop = chatBox.scrollHeight;

return message;
```

}

async function sendMessage(text) {
text = text.trim();

```
if (!text) return;

addMessage(text, "user");

userInput.value = "";
sendBtn.disabled = true;
userInput.disabled = true;

const loadingMessage = addMessage("Thinking...", "bot");

try {
    const result = await chat.sendMessage(text);
    const responseText = result.response.text();

    loadingMessage.querySelector(".bubble").textContent =
        responseText || "I couldn't generate a response.";

} catch (error) {
    console.error("AI error:", error);

    loadingMessage.querySelector(".bubble").textContent =
        "Sorry, I couldn't connect to the AI right now. Please try again.";
}

sendBtn.disabled = false;
userInput.disabled = false;
userInput.focus();

chatBox.scrollTop = chatBox.scrollHeight;
```

}

chatForm.addEventListener("submit", async (event) => {
event.preventDefault();
await sendMessage(userInput.value);
});

document.querySelectorAll(".suggestions button").forEach(button => {
button.addEventListener("click", () => {
sendMessage(button.dataset.question);
});
});
