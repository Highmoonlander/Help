<?php
session_start();
include 'config.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $conn->real_escape_string($_POST['username']);
    $password = $_POST['password'];
    
    $sql = "SELECT id, username, password FROM users WHERE username = '$username'";
    $result = $conn->query($sql);
    
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        
        if (password_verify($password, $row['password'])) {
            $_SESSION['loggedin'] = true;
            $_SESSION['id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            
            echo json_encode(['success' => true, 'message' => 'Login successful! Redirecting...']);
        } else {
            // Password is incorrect
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
        }
    } else {
        // Username doesn't exist
        echo json_encode(['success' => false, 'message' => 'Username not found']);
    }
} else {
    // Not a POST request
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>