<?php
include 'db_connection.php';

if (isset($_GET['course_id']) && isset($_GET['year']) && isset($_GET['semester'])) {
    $courseId = $_GET['course_id'];
    $year = $_GET['year'];
    $semester = $_GET['semester'];

    if ($courseId === 'all') {
        // Fetch all subjects for the selected course if "All Subjects" is selected
        if ($year === 'all' && $semester === 'all') {
            $stmt = $conn->prepare("SELECT * FROM subjects WHERE course_id = ?");
            $stmt->bind_param("i", $courseId);
        } else {
            // Modify the query to include year and semester filters if they are not "all"
            $yearFilter = $year !== 'all' ? "AND year = ?" : "";
            $semesterFilter = $semester !== 'all' ? "AND semester = ?" : "";

            $stmt = $conn->prepare("SELECT * FROM subjects WHERE course_id = ? $yearFilter $semesterFilter");
            if ($year !== 'all' && $semester !== 'all') {
                $stmt->bind_param("iss", $courseId, $year, $semester);
            } elseif ($year !== 'all') {
                $stmt->bind_param("is", $courseId, $year);
            } elseif ($semester !== 'all') {
                $stmt->bind_param("is", $courseId, $semester);
            } else {
                $stmt->bind_param("i", $courseId);
            }
        }
    } else {
        // Prepare and execute the query to fetch subjects based on selected course, year, and semester
        $stmt = $conn->prepare("SELECT * FROM subjects WHERE course_id = ? AND (year = ? OR ? = 'all') AND (semester = ? OR ? = 'all')");
        $stmt->bind_param("issss", $courseId, $year, $year, $semester, $semester);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $subjects = [];
    while ($row = $result->fetch_assoc()) {
        $subjects[] = $row;
    }

    echo json_encode($subjects); // Return the subjects as JSON
    $stmt->close();
}
$conn->close();
?>
