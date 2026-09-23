// ============================================
// SkillAnalyzer AI - AIChat.js
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

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
    apiKey:"AIzaSyBEYAmAoQ4rtLD3CPaBbfnUZBqek3cB7SA",
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


// ============================================
// APP CHECK
// ============================================

initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
        "6LfJjsotAAAAAJJiVEWLngTEIqwMFNpVHxET2Sm6"
    ),
    isTokenAutoRefreshEnabled: true
});


// ============================================
// FIREBASE AI LOGIC
// Gemini Developer API
// ============================================

const ai = getAI(app, {
    backend: new GoogleAIBackend()
});

const model = getGenerativeModel(ai, {
    model: "gemini-3.8-flash"
});

const chat = model.startChat();


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

    const message = document.createElement("div");
    message.className = "message " + type;

    if (type === "bot") {

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = "AI";

        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = text;

        message.appendChild(avatar);
        message.appendChild(bubble);

    } else {

        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = text;

        message.appendChild(bubble);
    }

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;

    return message;
}


// ============================================
// SEND MESSAGE
// ============================================

async function sendMessage(text) {

    text = text.trim();

    if (!text) return;


    // Show user message
    addMessage(text, "user");

    // Clear input
    userInput.value = "";

    // Disable controls
    sendBtn.disabled = true;
    userInput.disabled = true;


    // Loading message
    const loadingMessage =
        addMessage("Thinking...", "bot");

    const bubble =
        loadingMessage.querySelector(".bubble");


    try {

        console.log(
            "SkillAnalyzer AI: Sending message..."
        );

        const result =
            await chat.sendMessage(text);

        console.log(
            "SkillAnalyzer AI: Response received",
            result
        );

        const responseText =
            result.response.text();

        if (responseText && responseText.trim()) {

            bubble.textContent =
                responseText.trim();

        } else {

            bubble.textContent =
                "The AI returned an empty response.";
        }

    } catch (error) {

        console.error(
            "================================"
        );

        console.error(
            "SKILLANALYZER AI ERROR"
        );

        console.error(error);

        console.error(
            "================================"
        );


        // IMPORTANT:
        // Show the REAL Firebase error.
        // We are intentionally NOT hiding it.

        bubble.textContent =
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
    "✅ SkillAnalyzer AI is ready."
);
