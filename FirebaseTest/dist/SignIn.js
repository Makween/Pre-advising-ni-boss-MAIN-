import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-K6Hfx5jrTvnilwha29ceKov0PC2kII0",
  authDomain: "pre-advisingdb.firebaseapp.com",
  projectId: "pre-advisingdb",
  storageBucket: "pre-advisingdb.firebasestorage.app",
  messagingSenderId: "879799797410",
  appId: "1:879799797410:web:9a52fbf15ce59b8bda39fb",
  measurementId: "G-MSMWJ52KBW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get form elements
const submit = document.getElementById("submit");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Forgot password elements
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const forgotPasswordPopup = document.getElementById("forgotPasswordPopup");
const resetEmailInput = document.getElementById("resetEmail");
const resetPasswordSubmit = document.getElementById("resetPasswordSubmit");
const closePopup = document.getElementById("closePopup");

// Sign-in event
submit.addEventListener("click", async function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please fill in all the fields.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Signed in successfully!");
    window.location.href = "admin_homepage.html"; // Redirect to the dashboard or another page
  } catch (error) {
    console.error("Error:", error.code, error.message);
    alert("Failed to sign in. Please check your credentials.");
  }
});

// Show Forgot Password popup
forgotPasswordLink.addEventListener("click", function () {
  forgotPasswordPopup.style.display = "block";
});

// Close Forgot Password popup
closePopup.addEventListener("click", function () {
  forgotPasswordPopup.style.display = "none";
});

// Handle password reset
resetPasswordSubmit.addEventListener("click", async function () {
  const resetEmail = resetEmailInput.value.trim();
  console.log("Reset email:", resetEmail); // Log the email input to check if it's captured correctly

  if (!resetEmail) {
    alert("Please enter your email address.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, resetEmail);
    alert("Password reset link sent! Please check your email.");
    forgotPasswordPopup.style.display = "none";
  } catch (error) {
    console.error("Error sending reset email:", error.code, error.message);
    alert("Failed to send reset link. Please check the email entered.");
  }
});
