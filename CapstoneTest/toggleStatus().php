<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testpre-advising";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Update subject status
$subject_id = $_POST['subject_id'];
$current_status = $_POST['current_status'];
$new_status = ($current_status == 'active') ? 'inactive' : 'active';

$sql = "UPDATE subjects SET status='$new_status' WHERE id='$subject_id'";
$conn->query($sql);

header("Location: manage_courses.php");
?>
