<?php
include 'db_connection.php'; // Include your database connection file

if ($conn) {
    echo "Connected successfully to the database.";
} else {
    echo "Connection failed.";
}
?>
