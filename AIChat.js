// ============================================
// SkillAnalyzer AI - AIChat.js
// ============================================

// ---------- Firebase ----------
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


// ============================================
// FIREBASE APP CHECK
// ============================================

initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
        "6LfJjsotAAAAAJJiVEWLngTEIqwMFNpVHxET2Sm6"
    ),
    isTokenAutoRefreshEnabled: true
});


// ============================================
// INITIALIZE GEMINI
// ============================================

const ai = getAI(app, {
    backend: new GoogleAIBackend()
});

const model = getGenerativeModel(ai, {
    model: "gemini-3.8-flash"
});

const chat = model.startChat();


// ============================================
// GET HTML ELEMENTS
// ============================================

const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const suggestionButtons =
    document.querySelectorAll(".suggestions button");


// ============================================
// CHECK ELEMENTS
// ============================================

if (!chatBox || !chatForm || !userInput || !sendBtn) {
    console.error("SkillAnalyzer AI: Required HTML elements not found.");
}


// ============================================
// ADD MESSAGE TO CHAT
// ============================================

function addMessage(text, type) {

    const message = document.createElement("div");
    message.className = `message ${type}`;

    // ---------- AI MESSAGE ----------
    if (type === "bot") {

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = "AI";

        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = text;

        message.appendChild(avatar);
        message.appendChild(bubble);

    }

    // ---------- USER MESSAGE ----------
    else {

        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = text;

        message.appendChild(bubble);
    }

    chatBox.appendChild(message);

    // Automatically scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;

    return message;
}


// ============================================
// SEND MESSAGE TO GEMINI
// ============================================

async function sendMessage(text) {

    text = text.trim();

    if (!text) {
        return;
    }


    // Show user's message
    addMessage(text, "user");


    // Clear input
    userInput.value = "";


    // Disable controls while AI responds
    sendBtn.disabled = true;
    userInput.disabled = true;


    // Show loading message
    const loadingMessage =
        addMessage("Thinking...", "bot");


    try {

        console.log("SkillAnalyzer AI → Sending:", text);


        // Send message to Gemini
        const result = await chat.sendMessage(text);


        console.log(
            "SkillAnalyzer AI → Response received:",
            result
        );


        // Get response text
        const responseText =
            result.response.text();


        const bubble =
            loadingMessage.querySelector(".bubble");


        if (responseText && responseText.trim()) {

            bubble.textContent =
                responseText.trim();

        } else {

            bubble.textContent =
                "Sorry, I couldn't generate a response. Please try again.";
        }


    } catch (error) {

        console.error(
            "SkillAnalyzer AI Error:",
            error
        );


        const bubble =
            loadingMessage.querySelector(".bubble");


        let errorMessage =
            "Something went wrong. Please try again.";


        // More useful messages for common errors
        if (
            error.message &&
            error.message.includes("App Check")
        ) {

            errorMessage =
                "AI security verification failed. Please refresh the page and try again.";

        } else if (
            error.message &&
            error.message.includes("API key")
        ) {

            errorMessage =
                "AI configuration error. Please check the Firebase API configuration.";

        } else if (
            error.message &&
            error.message.includes("429")
        ) {

            errorMessage =
                "The AI is receiving too many requests right now. Please wait a moment and try again.";
        }


        bubble.textContent = errorMessage;
    }


    // Re-enable controls
    sendBtn.disabled = false;
    userInput.disabled = false;

    userInput.focus();

    chatBox.scrollTop =
        chatBox.scrollHeight;
}


// ============================================
// FORM SUBMISSION
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
// ENTER KEY SUPPORT
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
    "✅ SkillAnalyzer AI initialized successfully."
);
