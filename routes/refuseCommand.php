<?php
     include('../modules/db.php');
     header('Content-Type: application/json');
     session_start();
        if($_SERVER['REQUEST_METHOD'] !== 'POST')
        {
            echo json_encode(array('error' => 'Only POST requests are allowed'));
            http_response_code(405);
            exit();
        }
        $data = json_decode(file_get_contents('php://input'), true);
        if(empty($data['id']))
        {
            echo json_encode(array('error' => 'All input fields are required', 'status' => 'Failed'));
            http_response_code(400);
            exit();
        };
        try{
            $id = $data['id'];
            $query = $connection->prepare('SELECT * FROM commands WHERE id = ?');
            $query->execute([$id]);
            $command = $query->fetch();
            if($command)
            {
                $query = $connection->prepare('UPDATE commands SET status = ? WHERE id = ?');
                $query->execute(['refused', $id]);
                echo json_encode(array('message' => 'Command accepted successfully', 'status' => 'Accepted'));
            }else{
                echo json_encode(array('error' => 'Command not found', 'status' => 'Failed'));
                http_response_code(404);
                exit();
            }
        }
        catch(PDOException $e)
        {
            echo json_encode(array('error' => 'Data base error cant accept a command','status' => 'Failed'));
            http_response_code(400);
            exit();
        }
?>