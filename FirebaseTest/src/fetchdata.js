// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';
import { getFirestore, collection, getDocs, doc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-K6Hfx5jrTvnilwha29ceKov0PC2kII0",
    authDomain: "pre-advisingdb.firebaseapp.com",
    projectId: "pre-advisingdb",
    storageBucket: "pre-advisingdb.appspot.com",
    messagingSenderId: "879799797410",
    appId: "1:879799797410:web:9a52fbf15ce59b8bda39fb",
    measurementId: "G-MSMWJ52KBW"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

// Populate course dropdown from Firestore
const courseSelect = document.getElementById('course');
async function populateCourses() {
    const coursesColRef = collection(db, 'courses');
    const coursesSnapshot = await getDocs(coursesColRef);

    coursesSnapshot.forEach(doc => {
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = doc.data().courseName;
        courseSelect.appendChild(option);
    });
}
populateCourses();

// Fetch data and populate table
document.getElementById('fetch-data').addEventListener('click', async () => {
    const courseId = courseSelect.value;
    const yearLevel = document.getElementById('year-level').value;
    const semester = document.getElementById('semester').value;

    const dataTableBody = document.querySelector('#data-table tbody');
    dataTableBody.innerHTML = ''; // Clear previous data

    try {
        const courseDocRef = doc(db, 'courses', courseId);
        const courseSnapshot = await getDocs(courseDocRef);

        if (courseSnapshot.exists()) {
            const subjects = courseSnapshot.data().subjects;

            if (subjects[yearLevel] && subjects[yearLevel][semester]) {
                subjects[yearLevel][semester].forEach(subject => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${yearLevel}</td>
                        <td>${semester}</td>
                        <td>${subject.subjectId}</td>
                        <td>${subject.subjectName}</td>
                        <td>${subject.prerequisites.join(', ')}</td>
                        <td>${subject.units}</td>
                    `;
                    dataTableBody.appendChild(row);
                });
            } else {
                console.log('No subjects found for the selected year and semester.');
            }
        } else {
            console.log('Course not found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
