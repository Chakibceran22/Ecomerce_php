<?php
    include('../modules/db.php');
    header('Content-Type: application/json');
    session_start();
    $data = json_decode(file_get_contents('php://input'), true);
    if($_SERVER['REQUEST_METHOD'] != 'POST'){
        echo json_encode(['error' => 'This method is not allowed']);
        exit();
    }

    if(empty($data['ids'])){
        echo json_encode(['error' => 'Ids are required']);
        exit();
    }//this to get the products all for a command using their ids
    try{
        $ids = $data['ids'];
        $query = $connection->prepare(('SELECT * FROM products WHERE id IN ('.implode(',', array_fill(0, count($ids), '?')).')'));
        $query->execute($ids);
        $products = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['status'=> "success",'products' => $products]);
        exit();
    }catch(PDOException $e){
        echo json_encode(['error' => 'An error occured while getting the products']);
    }
?>