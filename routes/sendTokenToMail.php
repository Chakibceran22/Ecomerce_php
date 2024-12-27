<?php
    include('../modules/db.php');
    header('Content-Type: application/json');
    
    if($_SERVER['REQUEST_METHOD'] != 'POST') {
       echo json_encode(array('status' => 'error', 'message' => 'Invalid request method'));
        exit;
    }
    $data = json_decode(file_get_contents('php://input'), true);
    if(!isset($data['email'])) {
        echo json_encode(array('status' => 'error', 'message' => 'Email is required'));
        exit;
    }

    try{
        

        $email = $data['email'];
        $key = 'imanelove1';
        $token = generateToken($email,$key );
        $query = $connection->prepare('SELECT * FROM users WHERE email = :email');
        $query->bindValue(':email', $email, PDO::PARAM_STR);
        $query->execute();
        if($query->rowCount() > 0)
        {
            
            $subject = 'Password reset';
            $message = 'Click on the link below to reset your password: http://localhost/TP_Projects/Ecomerce/views/resetPasswordPage.html'.$email.'&token='.$token;
            mail($email, $subject, $message);
            echo json_encode(array('status' => 'success', 'message' => 'Token sent to email'));
            exit();
        }
        else{
            echo json_encode(array('status' => 'error', 'message' => 'Email not found'));
            exit();
        }


        echo json_encode(array('status' => 'success', 'message' => 'Token sent to email'));
    } catch(PDOException $ex) {
        echo json_encode(array('status' => 'error', 'message' => 'An error occurred'));
    }
    function generateToken($email, $secretKey) {
        $data = [
            'email' => $email,
            'expires' => time() + 3600 // 1 hour expiration
        ];
        $json = json_encode($data);
    
        // Ensure the IV is exactly 16 bytes
        $iv = substr(hash('sha256', $secretKey), 0, 16);
    
        // Encrypt the token
        $encrypted = openssl_encrypt($json, 'AES-256-CBC', $secretKey, 0, $iv);
    
        return urlencode($encrypted);
    }
?>