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
        $query = "SELECT * FROM products";
        $querry = $connection->prepare($query);
        $querry->execute();
        $result = $querry->fetchAll(PDO::FETCH_ASSOC);
        if($result){
            echo json_encode(['success' => 'Products found','status' => 'success','products' => $result]);
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