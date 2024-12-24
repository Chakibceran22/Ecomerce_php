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

        
        

        if(empty($data['data']['id']) || empty($data['data']['quantity']))
        {
            echo json_encode(array('error' => 'All input fields are required', 'status' => 'Failed', 'data' => $data,'user' => $_SESSION['user']['username']));
            http_response_code(400);
            exit();
        };
        
        $product_id = $data['data']['id'];
        $quantity = $data['data']['quantity'];
        $quantity = (int)$quantity;

        $query = $connection->prepare('INSERT INTO cart (user_id,product_id, qnt) VALUES (?,?, ?)');
        $query->execute([$_SESSION['user']['username'],$product_id, $quantity]);
        $product = $query->fetch();
        echo json_encode(array('message' => 'Product added to cart', 'status' => 'Success'));
        // if(!$product)
        // {
        //     echo json_encode(array('error' => 'Product not found', 'status' => 'Failed'));
        //     http_response_code(404);
        //     exit();
        // }

        // if($product['stock'] < $quantity)
        // {
        //     echo json_encode(array('error' => 'Not enough stock', 'status' => 'Failed'));
        //     http_response_code(400);
        //     exit();
        // }

        // $cart = $_SESSION['cart'] ?? [];
        // $cart[$product_id] = $cart[$product_id] + $quantity ?? $quantity;
        // $_SESSION['cart'] = $cart;

        // echo json_encode(array('message' => 'Product added to cart', 'status' => 'Success'));
    }
    catch(PDOException $e)
    {
        $errorcode = $e->getCode();
        if($errorcode == 23000)
        {
            //update the quantity
            try{
                $query = $connection->prepare('UPDATE cart SET qnt = ? WHERE user_id = ? AND product_id = ?');
                $query->execute([$quantity,$_SESSION['user']['username'],$product_id]);
                echo json_encode(array('message' => 'Product added to cart', 'status' => 'Success'));
                exit();
            }catch(PDOException $e)
            {
                echo json_encode(array('error' => 'Data base error cant add a product','status' => 'Failed', 'message' => $e->getMessage()));
                http_response_code(400);
                exit();
            }

        }
        echo json_encode(array('error' => 'Data base error cant add a product','status' => 'Failed', 'message' => $e->getMessage()));
        http_response_code(400);
        exit();
    }
?>