import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Get form elements
const submit = document.getElementById("submit");
const firstnameInput = document.getElementById("firstname");
const lastnameInput = document.getElementById("lastname");
const schoolIDInput = document.getElementById("schoolID");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

// Restrict School ID input to only numbers and dash
schoolIDInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9-]/g, ""); // Allow only digits and dash
});

// Sign-up event
submit.addEventListener("click", async function (event) {
  event.preventDefault();

  // Get input values
  const firstname = firstnameInput.value.trim();
  const lastname = lastnameInput.value.trim();
  const schoolID = schoolIDInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validate inputs
  if (!firstname || !lastname || !schoolID || !email || !password) {
    alert("Please fill in all the fields.");
    return;
  }

  // Validate School ID format (e.g., 2020-01386)
  const schoolIDPattern = /^\d{4}-\d{5}$/;
  if (!schoolIDPattern.test(schoolID)) {
    alert("Please enter a valid School ID (e.g., 2000-00000).");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstname,
      lastname,
      schoolID,
      email,
    });

    // Success message or redirection
    alert("Account successfully created!");
    window.location.href = "SignIn.html";
  } catch (error) {
    console.error("Error:", error.code, error.message);

    // Map Firebase error codes to user-friendly messages
    const errorMessages = {
      "auth/email-already-in-use": "This email is already registered. Please log in.",
      "auth/invalid-email": "Invalid email format. Please try again.",
      "auth/weak-password": "Password is too weak. Please use at least 6 characters.",
    };

    const userMessage = errorMessages[error.code] || "An error occurred. Please try again.";
    alert(userMessage);
  }
});
