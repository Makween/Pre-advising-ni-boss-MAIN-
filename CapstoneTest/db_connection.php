<?php
// Database connection
$servername = "localhost"; // Change if your DB server is different
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "CapstoneTest1"; // Updated to new database name

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch existing courses
$courses_result = $conn->query("SELECT * FROM courses");

// Handle Add Course form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_course'])) {
    $course_name = $_POST['course_name'];
    $sql = "INSERT INTO courses (course_name) VALUES ('$course_name')";
    if ($conn->query($sql) === TRUE) {
        header("Location: " . $_SERVER['PHP_SELF']);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Fetch subjects based on selected course and filters
$selected_course_id = isset($_POST['course_id']) ? $_POST['course_id'] : '';
$year_filter = isset($_POST['year']) ? $_POST['year'] : '';
$status_filter = isset($_POST['status']) ? $_POST['status'] : '';

// Adjust the subject query according to your new schema
$subject_query = "SELECT * FROM subjects WHERE course_id='$selected_course_id'";
if ($year_filter) {
    $subject_query .= " AND year='$year_filter'"; // Update based on your schema if needed
}
if ($status_filter) {
    $subject_query .= " AND is_active='$status_filter'"; // Adjusted for the active/inactive status
}

$subjects_result = $conn->query($subject_query);
?>
