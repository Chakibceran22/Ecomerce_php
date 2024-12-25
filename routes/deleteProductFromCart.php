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
        $username = $_SESSION['user']['username'];
        $productId = $data['id'];
        $query = $connection->prepare('DELETE FROM cart WHERE user_id = ? AND product_id = ?');
        $query->execute([$username, $productId]);
        if ($query->rowCount() > 0) {
            echo json_encode(array('message' => 'Product deleted successfully', 'status' => 'Deleted'));
        } else {
            echo json_encode(array('error' => 'Product not found or already deleted', 'status' => 'Failed'));
            http_response_code(404);
        }


    }catch(PDOException $ex){

        echo json_encode(array('error' => 'Database error','message'=> $ex->getMessage()));
        http_response_code(500);
        exit();
    }
?>