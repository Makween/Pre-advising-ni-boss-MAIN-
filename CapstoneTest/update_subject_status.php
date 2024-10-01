<?php
include 'db_connection.php';

$subject_id = $_POST['subject_id'];
$status = $_POST['status'];

// Update the status of the subject
$query = "UPDATE subjects SET status = ? WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("si", $status, $subject_id);
$stmt->execute();

echo "Status updated successfully";
?>
