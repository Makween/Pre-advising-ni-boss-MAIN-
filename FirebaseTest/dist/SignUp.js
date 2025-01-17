
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

//Input fields
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const schoolID = document.getElementById("schoolID").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    window.location.href="SignIn.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });

})