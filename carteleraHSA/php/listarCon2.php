<?php
$host = 'localhost';
$database = 'cartelera';
$user = 'supervisor';
$password = 'imagenes1234';

try {
    $connection = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "select * from multimedia where are_mul='consultorios2'";
    $statement = $connection->query($query);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Cerrar la conexión
    $connection = null;

    // Convertir los datos a JSON
    $jsonResult = json_encode($result);

    // Enviar los datos JSON como respuesta
    header('Content-Type: application/json');
    echo $jsonResult;
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
}
?>
