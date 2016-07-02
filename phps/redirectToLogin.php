<?php
#main
session_start();

if (!(isset($_SESSION['login']) && $_SESSION['login'] != '')) {
    header ("Location: http://sand.truman.edu/~dtl1325/Milestone4/login.php");
}
?>