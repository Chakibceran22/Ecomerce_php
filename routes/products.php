<?php 
    include('../modules/db.php');

    try{
        $sql = "SELECT * FROM products";
        $result = $connection->query($sql);
        $products = $result->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($products);
    }catch( PDOException $e){
        echo 'Connection failed: ' . $e->getMessage();
    }

?>