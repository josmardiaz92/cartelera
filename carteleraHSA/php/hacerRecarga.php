<?php
$host = 'localhost';
$database = 'cartelera';
$user = 'chismoso';
$password = '134679';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $estatus = $_POST["estatus"];
    

    $pdo = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
    
    $stmt = $pdo->prepare("UPDATE acciones SET est_acc = :estatus WHERE acc_acc = 'recargar'");
    $stmt->bindParam(':estatus', $estatus);
    $result = $stmt->execute();
    // Crear un objeto que contenga la información a enviar
    $response = array("success" => $result);
    echo json_encode($response);
} else {
    // En caso de error, también se envía un objeto JSON
    $response = array("success" => false);
    echo json_encode($response);
}
?>
