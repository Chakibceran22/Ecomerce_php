<?php
    include('../modules/db.php');
    header('Content-Type: application/json');
    session_start();
    $data = json_decode(file_get_contents('php://input'), true);
    
    if(empty($data['total'] || !isset($data['products_ids']))){
        echo json_encode(['error' => 'Total is required']);
        exit();
    }

    try{
        $total = $data['total'];
        $products_ids = json_encode($data['products_ids']);
        $username = $_SESSION['user']['username'];
        $query = $connection->prepare('INSERT INTO commands (user_id,date,total,products_ids) VALUES (?,?,?,?);');
        $query->execute([$username, date('Y-m-d H:i:s'), $total,$products_ids]);
        echo json_encode(['message' => 'Command added successfully',"status" => "success"]);
        exit();
    }catch(PDOException $ex){
        echo json_encode(['error' => 'An error occurred while adding the command']);
        exit();

    }
?>