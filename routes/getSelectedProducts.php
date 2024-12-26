<?php
    include('../modules/db.php');
    header('Content-Type: application/json');
    session_start();
    $data = json_decode(file_get_contents('php://input'), true);
    if($_SERVER['REQUEST_METHOD'] != 'POST'){
        echo json_encode(['error' => 'This method is not allowed']);
        exit();
    }

    if(empty($data['ids']) || empty($data['id'])){
        echo json_encode(['error' => 'Ids are required']);
        exit();
    }//this to get the products all for a command using their ids
    try{
        $ids = $data['ids'];
        $id = $data['id'];
        $query = $connection->prepare(('SELECT * FROM products WHERE id IN ('.implode(',', array_fill(0, count($ids), '?')).')'));
        $query->execute($ids);
        $products = $query->fetchAll(PDO::FETCH_ASSOC);
        $quntQuery = $connection->prepare('SELECT products_ids FROM commands WHERE id = ?');
        $quntQuery->execute([$id]);
        $qunt = $quntQuery->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['status'=> "success",'products' => $products,'products_ids' => $qunt]);
        exit();
    }catch(PDOException $e){
        echo json_encode(['error' => 'An error occured while getting the products']);
    }
?>