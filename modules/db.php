<?php 
    $host = 'localhost';
    $user = 'root';
    $password = '';
    $db = 'ecomerce';

    $connection = new mysqli($host, $user, $password, $db);

    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
?>