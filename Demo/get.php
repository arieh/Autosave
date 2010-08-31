<?php
$pdo = new PDO('mysql:host=localhost;dbname=autosave','root','1234');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$pdo->query("SET NAMES 'utf8'");

if ((int)$_POST['step']>-1){
   
    $sql = "SELECT * FROM `data` WHERE `step`=?";
    $st = $pdo->prepare($sql);
    $st->execute(array((int)$_POST['step']));
}else{
    $sql = "SELECT * FROM `data` ORDER BY `step` DESC LIMIT 1";
    $st = $pdo->prepare($sql);
    $st->execute();
}

$res = $st->fetch(PDO::FETCH_ASSOC);

echo json_encode($res);