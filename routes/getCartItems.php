<?php
    include('../modules/db.php');
    header('Content-Type: application/json');
    session_start();
    if($_SERVER['REQUEST_METHOD'] !== 'GET')
    {
        echo json_encode(array('error' => 'Only GET requests are allowed'));
        http_response_code(405);
        exit();
    }

    
?>