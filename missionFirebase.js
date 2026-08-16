import { db } from "./firebase.js";

import {
    doc,
        setDoc
        } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

        export async function saveMissionAnswer(
            userId,
                category,
                    missionNumber,
                        answer
                        ) {
                            const missionRef = doc(
                                    db,
                                            "users",
                                                    userId,
                                                            "assessments",
                                                                    category
                                                                        );

                                                                            await setDoc(
                                                                                    missionRef,
                                                                                            {
                                                                                                        [`mission${missionNumber}`]: {
                                                                                                                        answer: answer,
                                                                                                                                        completedAt: new Date().toISOString()
                                                                                                                                                    }
                                                                                                                                                            },
                                                                                                                                                                    { merge: true }
                                                                                                                                                                        );
                                                                                                                                                                        }