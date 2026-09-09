import {
    functions,
    auth
} from "./firebase.js";

import {
    httpsCallable
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-functions.js";


const chatWithAI = httpsCallable(
    functions,
    "chatWithLearnMateAI"
);


// Send message to AI
export async function askLearnMateAI(
    message,
    assessmentData = {}
) {

    try {

        const user = auth.currentUser;

        if (!user) {

            throw new Error(
                "Please login before using Learn Mate AI."
            );
        }


        const result = await chatWithAI({

            message: message,

            assessmentData: assessmentData

        });


        return result.data;

    } catch (error) {

        console.error(
            "Learn Mate AI Error:",
            error
        );

        throw new Error(
            error.message ||
            "Unable to connect to Learn Mate AI."
        );
    }
}