<?php 
    include('../modules/db.php');
    header('Content-Type: application/json');
    session_start();
    // session_unset();
     //for now this only to test the fuctionality in the website 
    // if(isset($_SESSION['user']) ){
    //     echo json_encode(['success' => 'User already logged in','status' => 'success','usertype' => $_SESSION['user']['type'],'username' => $_SESSION['user']['username']]);
    //     exit;
    // }
    if($_SERVER['REQUEST_METHOD'] !== 'POST')
    {
        echo json_encode(array('error' => 'Only POST requests are allowed'));
        http_response_code(405);
        exit();
    }
    


    
    $data = json_decode(file_get_contents('php://input'), true);

    
    if ($data === null) {
        echo json_encode(['error' => 'Invalid JSON received']);
        exit;  // Exit if the JSON is invalid
    }
    $username = $data['username'];
    $password = $data['password'];

    try{
        $querry =$connection->prepare("SELECT * FROM users WHERE username = ?");
        $querry->execute([$username]);
        $user = $querry->fetch(PDO::FETCH_ASSOC);
        if($user)
        {
            if(password_verify($password, $user['password']))
            {
                $_SESSION['user'] = $user;
                $_SESSION['access_granted'] = true;
                if($user['type'] == 'admin')
                {
                    //get the products from the database
                    try{
                        $query = "SELECT * FROM products";
                        $stmt = $connection->prepare($query);
                        $stmt->execute();
                        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        echo json_encode(['success' => 'User logged in','status' => 'success','usertype' => $user['type'],'username' => $user['username'],'products' => $products]);
                        exit;}
                    catch(PDOException $e){
                        echo json_encode(array('error' => 'An error occurred. Please try again later', 'status' => 'Failed', 'message' => $e->getMessage()));
                        http_response_code(500);
                        exit();
                    }
                }
                try{
                    //this is to get the cart items fromm the data base
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
                    
                    echo json_encode(['success' => 'User logged in','status' => 'success','usertype' => $user['type'],'username' => $user['username'],'cart' => $cart]);
            
                }catch(PDOException $e)
                {
                    echo json_encode(array('error' => 'An error occurred. Please try again later', 'status' => 'Failed', 'message' => $e->getMessage()));
            
                    http_response_code(500);
                    exit();
                }
            }
            else{
                echo json_encode(['error' => 'Invalid password']);
                exit;
            }
        }
        else{
            echo json_encode(['error' => 'Invalid username ']);
            exit;
        }
    }catch(PDOException $e)
    {
        echo json_encode(['error' => 'An error occurred while trying to fetch user']);
        exit;
    }
    
   
?>