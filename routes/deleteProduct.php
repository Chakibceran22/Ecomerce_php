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

    try{
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        $query = $connection->prepare("DELETE FROM products WHERE id = ?");
        $query->execute([$id]);
        if ($query->rowCount() > 0) {
            echo json_encode(array('message' => 'Product deleted successfully', 'status' => 'Deleted'));
        } else {
            echo json_encode(array('error' => 'Product not found or already deleted', 'status' => 'Failed'));
            http_response_code(404);
        }
        exit();
    }
    catch(PDOException $e)
    {
        echo json_encode(array('error' => 'Data base error cant delete a product','status' => 'Failed'));
        http_response_code(400);
        exit();
    }

    
?>