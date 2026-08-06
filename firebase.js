import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const firebaseConfig = {
      apiKey:"AIzaSyAZVt5Y4OVUPMZel0oARdtkXlZt8L-ai34",
        authDomain:"skillanalyzer-373ae.firebaseapp.com",
          projectId: "skillanalyzer-373ae",
            storageBucket: "skillanalyzer-373ae.firebasestorage.app",
              messagingSenderId: "952710822091",
                appId: "1:952710822091:web:0f94738430db44219f834e",
                };
                const app = initializeApp(firebaseConfig);

                const auth = getAuth(app);

                const db = getFirestore(app);

                export { auth, db };
