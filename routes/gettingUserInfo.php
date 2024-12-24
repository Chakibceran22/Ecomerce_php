<?php
    include('../modules/db.php');
    header('Content-Type: application/json');
    session_start();

    $user = $_SESSION['user'];
    echo json_encode(['status' => 'success', 'user' => $user]);
    
?>
<!-- this request is for getting the cart of the uers -->
<!-- SELECT 
    products.name,
    products.price,
    products.image,
    products.description,
    products.stock,
    users.username AS buyer_username,
    sellerproducts.product_id,
    sellerproducts.user_id
FROM 
    cart
JOIN 
    users ON cart.user_id = users.username
JOIN 
    products ON cart.product_id = products.id
JOIN 
    sellerproducts ON cart.product_id = sellerproducts.product_id
WHERE 
    cart.seller_id = sellerproducts.user_id; -->
    <!-- this on is to get the seller bases on the product id  -->

    <!-- SELECT sellerproducts.user_id FROM sellerproducts JOIN products ON sellerproducts.product_id = products.id WHERE sellerproducts.product_id = 1 -->