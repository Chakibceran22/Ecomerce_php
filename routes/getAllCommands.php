<?php
     include('../modules/db.php');
     header('Content-Type: application/json');
     session_start();

     try{
            $query = $connection->prepare('SELECT * FROM commands');
            $query->execute();
            $commands = $query->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($commands);
     }catch(PDOException $ex){
         echo json_encode(['error' => 'An error occurred while getting the commands']);
         exit();
     }
?>