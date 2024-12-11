<?php 
    include('../modules/db.php');
    header('Content-Type: application/json');
    session_start();
    session_unset(); //for now this only to test the fuctionality in the website 
    if(isset($_SESSION['user']) ){
        echo json_encode(['success' => 'User already logged in','status' => 'success','usertype' => $_SESSION['user']['type']]);
        exit;
    }
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
                echo json_encode(['success' => 'User logged in successfully','status' => 'success','usertype' => $user['type']]);
                exit;
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