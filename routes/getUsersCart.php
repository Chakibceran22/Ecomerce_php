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
    // $data = json_decode(file_get_contents('php://input'), true);
    

    // if ($data === null) {
    //     echo json_encode(['error' => 'Invalid JSON received']);
    //     exit;  // Exit if the JSON is invalid
    // }
    try{
        $username = $_SESSION['user']['username'];
        
        $query = "
            SELECT 
                products.id, 
                products.name, 
                products.image, 
                products.description, 
                products.price, 
                products.stock, 
                cart.qnt
            FROM 
                users
            JOIN 
                cart ON users.username = cart.user_id
            JOIN 
                products ON cart.product_id = products.id
            WHERE 
                users.username = :username
        ";

 
        $stmt = $connection->prepare($query);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute();
        $cart = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(['message' => 'Cart retrieved ','status' => 'success','cart' => $cart]);
        exit;

    }catch(PDOException $e)
    {
        echo json_encode(array('error' => 'An error occurred. Please try again later', 'status' => 'Failed', 'message' => $e->getMessage()));

        http_response_code(500);
        exit();
    }
?>