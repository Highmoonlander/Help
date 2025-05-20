<?php
$host = "localhost";
$username = "root";
$password = "Orbit@123"; 
$database = "bookstore";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>