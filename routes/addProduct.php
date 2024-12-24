<?php
    include('../modules/db.php');
    header('Content-Type: application/json');
    session_start();
    if($_SERVER['REQUEST_METHOD'] !== 'POST')
    {
        echo json_encode(array('error' => 'Only POST requests are allowed'));
        http_response_code(405);
        exit();
    }
    $data = json_decode(file_get_contents('php://input'), true);
    try{
        if(empty($data['name']) || empty($data['price']) || empty($data['description']) || empty($data['image']) || empty($data['stock']))
        {
            echo json_encode(array('error' => 'All input fields are required', 'status' => 'Failed'));
            http_response_code(400);
            exit();
        };
        

        $name = $data['name'];
        $price = $data['price'];
        $description = $data['description'];
        $image = $data['image'];
        $stock = $data['stock'];
        $stock = (int)$stock;

        $query = $connection->prepare('INSERT INTO products (name, price,image, description, stock) VALUES (?, ?, ?, ?, ?)');
        $query->execute([$name, $price, $image, $description, $stock]);



        echo json_encode(array('message' => 'Product added successfully', 'status' => 'Created'));

    }catch(PDOException $e)
    {
        echo json_encode(array('error' => 'Data base error cant add a product','status' => 'Failed'));
        http_response_code(400);
        exit();
    }
    

   
?>