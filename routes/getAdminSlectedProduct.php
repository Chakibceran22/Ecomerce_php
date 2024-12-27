<?php
    include('../modules/db.php');
    header('Content-Type: application/json');
    session_start();
    $data = json_decode(file_get_contents('php://input'), true);
    if($_SERVER['REQUEST_METHOD'] != 'POST'){
        echo json_encode(['error' => 'This method is not allowed']);
        exit();
    }

    if(empty($data['id'])){
        echo json_encode(['error' => 'Id is required']);
        exit();
    }
    try{
        $id = $data['id'];
        $query = $connection->prepare('SELECT * FROM commands WHERE id = ?');
        $query->execute([$id]);
        $command = $query->fetch(PDO::FETCH_ASSOC);
        $products = json_decode($command['products_ids'], true);
        $product_ids = array_keys($products);     
        $product_qnt = array_values($products);
        $productIdsString = implode(",", $product_ids); 

        $product_query = $connection->prepare("SELECT * FROM products WHERE id IN ($productIdsString)");
        $product_query->execute();
        $products = $product_query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['status'=> "success", 'products' => $products,'qnt' => $product_qnt]);
        exit();
    }catch(PDOException $e){
        echo json_encode(['error' => 'An error occured while getting the products']);
    }
?>