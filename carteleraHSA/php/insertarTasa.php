<?php
$host = 'localhost';
$database = 'cartelera';
$user = 'chismoso';
$password = '134679';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usd_cam = $_POST["dolar"]; // Valor para usd_cam
    $cop_cam = $_POST["pesos"]; // Valor para cop_cam
    $res_cam = $_POST["responsable"]; // Valor para res_cam

    // Configurar la conexión a la base de datos (usando PDO)
    $pdo = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
    
    // Insertar la información en la tabla cambio
    $stmt = $pdo->prepare("INSERT INTO cambio (usd_cam, cop_cam, res_cam) VALUES (:usd, :cop, :res)");
    $stmt->bindParam(':usd', $usd_cam, PDO::PARAM_STR);
    $stmt->bindParam(':cop', $cop_cam, PDO::PARAM_STR);
    $stmt->bindParam(':res', $res_cam, PDO::PARAM_STR);
    $result = $stmt->execute();

    if ($result) {
        $response = array("success" => true);
        echo json_encode($response);
    } else {
        // En caso de error, también se envía un objeto JSON
        $response = array("success" => false);
        echo json_encode($response);
    }
}
?>
