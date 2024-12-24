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

    try{
        //this is to get the cart items fromm the data base
        $query = $connection->prepare('SELECT products.id, products.name, products.image,products.description,products.price,products.stock, cart.qnt
                                        FROM users
                                        JOIN cart ON users.username = cart.user_id
                                        JOIN products ON cart.product_id = products.id
                                        WHERE users.username = ?');
        $query->execute([$_SESSION['user']['username']]);
        $cart = $query->fetchAll();
        echo json_encode($cart);

    }catch(PDOException $e)
    {
        echo json_encode(array('error' => 'An error occurred. Please try again later', 'status' => 'Failed', 'message' => $e->getMessage()));

        http_response_code(500);
        exit();
    }
?>