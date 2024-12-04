<?php 
    try{
        $host = 'localhost';
        $user = 'root';
        $password = '';
        $db = 'ecomerce';
        $dsn = "mysql:host=$host;dbname=$db;charset=utf8";

        $connection = new PDO($dsn, $user, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $connection->exec("set names utf8");
    }catch(PDOException $e){
        echo 'Connection failed: ' . $e->getMessage();
    }
?>