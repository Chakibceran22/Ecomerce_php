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
        exit();
        // try{
        //     $query = "
        //                 SELECT 
        //                     products.id, 
        //                     products.name, 
        //                     products.image, 
        //                     products.description, 
        //                     products.price, 
        //                     products.stock, 
        //                     cart.qnt
        //                 FROM 
        //                     users
        //                 JOIN 
        //                     cart ON users.username = cart.user_id
        //                 JOIN 
        //                     products ON cart.product_id = products.id
        //                 WHERE 
        //                     users.username = :username
        //             ";

             
        //             $stmt = $connection->prepare($query);
        //             $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        //             $stmt->execute();
        //             $cart = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
        //             echo json_encode(['success' => 'User logged in','status' => 'success','usertype' => $user['type'],'username' => $user['username'],'cart' => $cart]);
        //             exit;
        // }catch(PDOException $e)
        // {
        //     echo json_encode(array('error' => 'Data base error cant add a product','status' => 'Failed', 'message' => $e->getMessage()));
        //     http_response_code(400);
        //     exit();
        // }
        
        
        
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