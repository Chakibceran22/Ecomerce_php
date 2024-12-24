<?php
    include('../modules/db.php');
    header('Content-Type: application/json');

    session_start();
    try{

        if($_SERVER['REQUEST_METHOD'] !== 'POST')
        {
            echo json_encode(array('error' => 'Only POST requests are allowed'));
            http_response_code(405);
            exit();
        }
        $query = "SELECT 
                products.id ,
                products.name ,
                products.price ,
                products.description ,
                products.image ,
                users.username ,
                sellerproducts.user_id as seller_id
            FROM 
                cart
            JOIN 
                products ON cart.product_id = products.id
            JOIN 
                sellerproducts ON cart.product_id = sellerproducts.product_id
            JOIN 
                users ON cart.user_id = users.username
            WHERE 
                cart.user_id = ?;";
        $querry = $connection->prepare($query);
        $querry->bindParam(1, $_SESSION['user']['username'], PDO::PARAM_STR);
        $querry->execute();
        $result = $querry->fetchAll(PDO::FETCH_ASSOC);
        if($result){
            echo json_encode(['success' => 'Products found','status' => 'success','products' => $result, 'user' => $_SESSION['user']]);
        }
        else
        {
            echo json_encode(['error' => 'No products found']); 
        }
    }catch(PDOException $e)
    {
        echo json_encode(['error' => 'An error occurred while trying to fetch user']);
        echo $e;
        exit;
    }

?>