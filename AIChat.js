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
    appId: "1:952710822091:web:133fbd8662f649829f834e"
};

const app = initializeApp(firebaseConfig);

const ai = getAI(app, {
    backend: new GoogleAIBackend()
});

const model = getGenerativeModel(ai, {
    model: "gemini-3.8-flash"
});

const chat = model.startChat();

const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

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

async function sendMessage(text) {
    text = text.trim();

    if (!text) {
        return;
    }

    addMessage(text, "user");

    userInput.value = "";
    sendBtn.disabled = true;
    userInput.disabled = true;

    const loadingMessage = addMessage("Thinking...", "bot");

    try {
        console.log("Sending:", text);

        const result = await chat.sendMessage(text);

        console.log("AI response:", result);

        const responseText = result.response.text();

        const bubble = loadingMessage.querySelector(".bubble");

        if (responseText) {
            bubble.textContent = responseText;
        } else {
            bubble.textContent = "The AI returned an empty response.";
        }

    } catch (error) {
        console.error("FIREBASE AI ERROR:", error);

        const bubble = loadingMessage.querySelector(".bubble");

        bubble.textContent =
            "AI Error: " + (error.message || "Unknown error");
    }

    sendBtn.disabled = false;
    userInput.disabled = false;
    userInput.focus();

    chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    sendMessage(userInput.value);
});

const suggestionButtons =
    document.querySelectorAll(".suggestions button");

suggestionButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        sendMessage(button.dataset.question);
    });
});