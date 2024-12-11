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
        
        
        $sql = "SELECT 
            sellerproducts.id AS sellerproducts_id,
            users.username AS user_username,
            users.type AS user_type,
            products.id AS product_id,
            products.name AS product_name,
            products.description AS product_desc,
            products.price AS product_price,
            products.image AS product_image,
            products.stock AS product_stock
        FROM 
            sellerproducts
        JOIN 
            users ON sellerproducts.user_id = users.username  
        JOIN 
            products ON sellerproducts.product_id = products.id
        WHERE 
            users.username = :username ;";
            

        $querry = $connection->prepare($sql);
        $querry->bindParam(':username', $_SESSION['user']['username'], PDO::PARAM_STR);
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