```js
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

const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
        "6LeNHNAtAAAAAN-yQbwQhQM4c-Sn2ZdMUng2jPxi"
    ),
    isTokenAutoRefreshEnabled: true
});

console.log("SkillAnalyzer AI: App Check initialized.");


// ============================================
// FIREBASE AI
// IMPORTANT:
// Limited-use App Check tokens are enabled
// because Replay Protection is enforced.
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
// HTML ELEMENT CHECK
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
// SEND MESSAGE
// ============================================

async function sendMessage(text) {

    text = text.trim();


    if (!text) {
        return;
    }


    // ----------------------------------------
    // USER MESSAGE
    // ----------------------------------------

    addMessage(text, "user");

    userInput.value = "";

    sendBtn.disabled = true;

    userInput.disabled = true;


    // ----------------------------------------
    // LOADING MESSAGE
    // ----------------------------------------

    const loadingMessage =
        addMessage("Thinking...", "bot");

    const loadingBubble =
        loadingMessage.querySelector(".bubble");


    try {

        console.log(
            "SkillAnalyzer AI: Sending message to Gemini..."
        );


        // Firebase AI Logic automatically obtains
        // a limited-use App Check token for this
        // request because replay protection is enabled.

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


        const errorMessage =
            error?.message || String(error);


        loadingBubble.textContent =
            "AI ERROR:\n\n" +
            errorMessage;
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


// ============================================
// READY
// ============================================

console.log(
    "✅ SkillAnalyzer AI is ready."
);
```
