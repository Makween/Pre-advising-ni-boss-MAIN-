import { initializeApp } from 'firebase/app';
import { 
    getFirestore, collection, getDocs,
    setDoc, updateDoc, doc 
} from 'firebase/firestore';

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

// Collection reference
const coursesColRef = collection(db, 'courses');

// Adding courses and subjects
const addCourseForm = document.querySelector('.add-course');
addCourseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const courseId = addCourseForm.courseId.value;
    const courseName = addCourseForm.courseName.value;
    const year = addCourseForm.year.value;
    const semester = addCourseForm.semester.value;

    // Prepare the new subject
    const newSubject = {
        subjectId: addCourseForm.subjectId.value,
        subjectName: addCourseForm.subjectName.value,
        units: Number(addCourseForm.units.value),
        prerequisites: addCourseForm.prerequisites.value.split(',').map(item => item.trim()),
        status: "active"
    };

    try {
        // Reference to the course document using the provided courseId as the document ID
        const courseRef = doc(db, 'courses', courseId);

        // Check if the course exists
        const courseSnapshot = await getDocs(coursesColRef);
        const existingCourse = courseSnapshot.docs.find(doc => doc.id === courseId);

        if (existingCourse) {
            // Course exists, update the subjects
            console.log('Course exists:', existingCourse.id);
            const existingSubjects = existingCourse.data().subjects || {};

            // Ensure the year and semester exist
            if (!existingSubjects[year]) {
                existingSubjects[year] = {};
            }
            if (!existingSubjects[year][semester]) {
                existingSubjects[year][semester] = [];
            }

            // Check if the subject already exists
            const subjectExists = existingSubjects[year][semester].some(subject => subject.subjectId === newSubject.subjectId);

            if (!subjectExists) {
                // Add the new subject to the appropriate year and semester
                existingSubjects[year][semester].push(newSubject);

                // Update the course document with the new subjects
                await updateDoc(courseRef, {
                    subjects: existingSubjects // Update the subjects field
                });

                console.log('Subject added to existing course');
            } else {
                console.log('Subject already exists in the specified semester and year.');
            }
        } else {
            // Create a new course document if it doesn't exist
            console.log('Creating new course:', courseId);
            const newCourseData = {
                courseId: courseId,
                courseName: courseName,
                subjects: {
                    [year]: {
                        [semester]: [newSubject] // Start with the new subject
                    }
                }
            };

            // Use setDoc to set the document with courseId as the document ID
            await setDoc(courseRef, newCourseData); 

            console.log('Course created successfully');
        }

        // Reset form
        addCourseForm.reset();
    } catch (error) {
        console.error('Error adding course or subject:', error);
    }
});

// Deleting a subject by subjectId
const deleteSubjectForm = document.querySelector('.delete-subject');
deleteSubjectForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const subjectId = deleteSubjectForm.subjectId.value;

    // Fetch all courses
    const coursesSnapshot = await getDocs(coursesColRef);

    // Iterate through each course to find the subject
    coursesSnapshot.docs.forEach(async (courseDoc) => {
        const courseData = courseDoc.data();

        // Loop through each year
        Object.keys(courseData.subjects).forEach(year => {
            // Loop through each semester
            Object.keys(courseData.subjects[year]).forEach(async semester => {
                const subjectsArray = courseData.subjects[year][semester];

                // Find index of subject with the given subjectId
                const subjectIndex = subjectsArray.findIndex(subject => subject.subjectId === subjectId);

                if (subjectIndex !== -1) {
                    // Remove the subject from the array
                    subjectsArray.splice(subjectIndex, 1);

                    // Update the Firestore document
                    const courseRef = doc(db, 'courses', courseDoc.id);
                    await updateDoc(courseRef, {
                        [`subjects.${year}.${semester}`]: subjectsArray
                    });

                    console.log(`Deleted subject with ID: ${subjectId} from course: ${courseDoc.id}`);
                }
            });
        });
    });

    // Reset form after deletion
    deleteSubjectForm.reset();
});
