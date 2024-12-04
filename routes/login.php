<?php 
    include('../modules/db.php');
    header('Content-Type: application/json');
    session_start();
    
    if(isset($_SESSION['user'])){
        echo json_encode($_SESSION['user']);
        echo json_encode(['success' => 'User already logged in']);
        exit;
    }
    


    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);

    
    if ($data === null) {
        echo json_encode(['error' => 'Invalid JSON received']);
        exit;  // Exit if the JSON is invalid
    }
    
    if (isset($data['username']) && isset($data['password'])) {
        $email = $data['username'];   // Username
        $password = $data['password'];  // Password
    
        // Prepare SQL query to find the user in the database
        $sql = "SELECT * FROM users WHERE username = '$email' AND password = '$password'";
        $result = $connection->query($sql);
    
        // Check if a matching user was found
        if ($result->num_rows > 0) {
            // Fetch the user data
            $user = $result->fetch_assoc();
            $_SESSION['user'] = $user;  
            echo json_encode($user);  
        } else {
            echo json_encode(['error' => 'User not found']);  // Return error if user not found
        }
    } else {
        echo json_encode(['error' => 'Username and password are required']);  // Return error if fields are missing
    }
    $connection->close();
?>