<?php 
    include('../modules/db.php');

    $sql = "SELECT * FROM users";
    $result = $connection->query($sql);

    if( $result->num_rows > 0 ){
        $users = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($users);
    } else {
        echo json_encode([]);
    }
    $connection->close();
?>