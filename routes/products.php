<?php 
    include('../modules/db.php');

    $sql = "SELECT * FROM products";
    $result = $connection->query($sql);

    if( $result->num_rows > 0 ){
        $products = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($products);
    } else {
        echo json_encode([]);
    }
    $connection->close();
?>