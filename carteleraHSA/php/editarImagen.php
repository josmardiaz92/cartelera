<?php
$host = 'localhost';
$database = 'cartelera';
$user = 'supervisor';
$password = 'imagenes1234';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $ubicacion = $_POST["ubicacion"];
    $area = $_POST["area"];
    $duracion = $_POST["duracion"];
    $estatus = $_POST["estatus"];
    $codigo=$_POST["codigo"];

    $pdo = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
    
    $stmt = $pdo->prepare("UPDATE multimedia SET ubi_mul = :ubicacion, are_mul = :area, dur_mul = :duracion, est_mul = :estatus WHERE cod_mul = :codigo");
    $stmt->bindParam(':ubicacion', $ubicacion);
    $stmt->bindParam(':area', $area);
    $stmt->bindParam(':duracion', $duracion);
    $stmt->bindParam(':estatus', $estatus);
    $stmt->bindParam(':codigo', $codigo);
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
