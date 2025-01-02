<?php
    session_start();
    session_unset();
    session_destroy();
    header("Location: http://localhost/TP_Projects/Ecomerce/views/index.html");
    exit();
?>