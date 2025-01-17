import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-K6Hfx5jrTvnilwha29ceKov0PC2kII0",
  authDomain: "pre-advisingdb.firebaseapp.com",
  projectId: "pre-advisingdb",
  storageBucket: "pre-advisingdb.firebasestorage.app",
  messagingSenderId: "879799797410",
  appId: "1:879799797410:web:9a52fbf15ce59b8bda39fb",
  measurementId: "G-MSMWJ52KBW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submit = document.getElementById("submit");

submit.addEventListener('click', function(event){
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.location.href = "admin_homepage.html"; // Redirect to dashboard or any other page
      })
      .catch((error) => {
        errorMessage.style.display = "block"; // Show error message
      });
});
