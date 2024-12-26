<?php
    include('../modules/db.php');
    header('Content-Type: application/json');
    session_start();

    if($_SERVER['REQUEST_METHOD'] != 'GET') {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
        exit();
    } 

    try{
        $username = $_SESSION['user']['username'];
        $query = $connection->prepare("SELECT * FROM commands WHERE user_id = ?");
        $query->execute([$username]);
        $commands = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['status' => 'success', 'commands' => $commands]);

    }catch(PDOException $e){
        echo json_encode(['status' => 'error', 'message' => 'An error occurred while fetching user information']);
        exit();
    }
?>