<?php
$pdo = new PDO('mysql:host=localhost;dbname=autosave','root','1234');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$pdo->query("SET NAMES 'utf8'");

$id = $pdo->quote($_POST['id']);

$pdo->query("DELETE FROM `data` WHERE `id`=$id");