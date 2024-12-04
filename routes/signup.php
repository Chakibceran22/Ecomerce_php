<?php 
    include('../modules/db.php');
    header('Content-Type: application/json');
    
    if($_SERVER['REQUEST_METHOD'] !== 'POST')
    {
        echo json_encode(array('error' => 'Only POST requests are allowed'));
        http_response_code(405);
        exit();
    }

    $data = json_decode(file_get_contents('php://input'), true);

    $username = $data['username'];
    $password = $data['password'];
    $type = $data['type'];
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    if(empty($username) || empty($password) || empty($type))
    {
        echo json_encode(array('error' => 'All input fields are required'));
        http_response_code(400);
        exit();
    }
    if($type !== 'admin' && $type !== 'buyer' && $type !== 'seller')
    {
        echo json_encode(array('error' => 'Invalid user type'));
        http_response_code(400);
        exit();
    }
    try{
        $query = $connection->prepare('INSERT INTO users ( username ,password,type) VALUES (?, ?, ?)');
        $query->execute([$username, $hashed_password, $type]);
        echo json_encode(array('message' => 'User created successfully', 'status' => 'Created'));

    }catch(Exception $e){
        if($e->getCode() == 23000)
        {
            echo json_encode(array('error' => 'Username already exists', 'code' => 409, 'status' => 'Conflict'));
            http_response_code(409);
            exit();
        }
        http_response_code(500);
        exit();
    }


    
?>