<?php
$host = 'localhost'; // Cambia esto por la dirección de tu servidor de base de datos
$database = 'cartelera'; // Cambia esto por el nombre de tu base de datos
$user = 'postgres'; // Cambia esto por el nombre de usuario de tu base de datos
$password = '240296'; // Cambia esto por la contraseña de tu base de datos

try {
    $connection = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo '¡Conexión exitosa a la base de datos!';
} catch (PDOException $e) {
    echo 'Error de conexión: ' . $e->getMessage();
}
?>
