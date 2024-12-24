<?php
include('../modules/db.php');
header('Content-Type: application/json');
session_start();
if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    echo json_encode(array('error' => 'Only POST requests are allowed'));
    http_response_code(405);
    exit();
}
    
    $data = json_decode(file_get_contents('php://input'), true);
    try{
        if(empty($data['id']) || empty($data['name']) || empty($data['price']) || empty($data['description']) || empty($data['image']) || empty($data['stock']))
        {
            echo json_encode(array('error' => 'All input fields are required', 'status' => 'Failed'));
            http_response_code(400);
            exit();
        };

        $query = $connection->prepare('UPDATE products SET name = ?, price = ?, image = ?, description = ?, stock = ? WHERE id = ?');
        $query->execute([$data['name'], $data['price'], $data['image'], $data['description'], $data['stock'], $data['id']]);
        if($query->rowCount() === 0)
        {
            echo json_encode(array('error' => 'Product not found', 'status' => 'Failed'));
            http_response_code(404);
            exit();
        }
        echo json_encode(array('message' => 'Product updated successfully', 'status' => 'Updated'));

    }catch(PDOException $e)
    {
        
        echo json_encode(array('error' => 'Data base error cant add a product','status' => 'Failed'));
        http_response_code(400);
        exit();
    }


?>