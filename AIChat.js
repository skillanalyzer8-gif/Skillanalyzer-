// ============================================
// SkillAnalyzer AI - AIChat.js
// ============================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    initializeAppCheck,
    ReCaptchaEnterpriseProvider,
    getToken
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
// APP CHECK
// IMPORTANT:
// This is the SAME key shown in Firebase
// App Check -> Skill -> reCAPTCHA Enterprise
// ============================================

const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
        "6LfJjsotAAAAAJJiVEWLngTEIqwMFNpVHxET2Sm6"
    ),
    isTokenAutoRefreshEnabled: true
});

console.log("SkillAnalyzer AI: App Check initialized.");


// ============================================
// AI
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
// SAFETY CHECK FOR HTML
// ============================================

if (!chatBox || !chatForm || !userInput || !sendBtn) {
    console.error(
        "SkillAnalyzer AI: Required HTML elements are missing."
    );
}


// ============================================
// ADD MESSAGE
// ============================================

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;


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
// CHECK APP CHECK TOKEN
// ============================================

async function verifyAppCheck() {

    try {

        console.log(
            "SkillAnalyzer AI: Requesting fresh App Check token..."
        );


        const tokenResult =
            await getToken(appCheck, true);


        if (!tokenResult || !tokenResult.token) {

            throw new Error(
                "Firebase App Check did not return a token."
            );
        }


        console.log(
            "SkillAnalyzer AI: App Check token received."
        );


        return true;

    } catch (error) {

        console.error(
            "SkillAnalyzer AI: App Check token error:",
            error
        );


        throw new Error(
            "App Check verification failed.\n\n" +
            (error?.message || String(error))
        );
    }
}


// ============================================
// SEND MESSAGE
// ============================================

async function sendMessage(text) {

    text = text.trim();


    if (!text) {
        return;
    }


    // User message
    addMessage(text, "user");


    userInput.value = "";

    sendBtn.disabled = true;

    userInput.disabled = true;


    // Loading message
    const loadingMessage =
        addMessage("Thinking...", "bot");


    const loadingBubble =
        loadingMessage.querySelector(".bubble");


    try {

        // ----------------------------------------
        // STEP 1: Verify App Check
        // ----------------------------------------

        await verifyAppCheck();


        // ----------------------------------------
        // STEP 2: Send message to Gemini
        // ----------------------------------------

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
    }


    finally {

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


console.log(
    "✅ SkillAnalyzer AI is ready."
);
