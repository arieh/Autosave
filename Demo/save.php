<?php
$pdo = new PDO('mysql:host=localhost;dbname=autosave','root','1234');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$pdo->query("SET NAMES 'utf8'");

$value = $pdo->quote($_POST['value']);
$step = $pdo->quote($_POST['step']);
$id = $pdo->quote($_POST['id']);

$pdo->query("INSERT INTO `data`(`id`,`step`,`value`) VALUES ($id,$step,$value)");