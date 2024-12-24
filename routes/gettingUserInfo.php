<?php
    include('../modules/db.php');
    header('Content-Type: application/json');
    session_start();

    $user = $_SESSION['user'];
    echo json_encode(['status' => 'success', 'user' => $user]);
    
?>
