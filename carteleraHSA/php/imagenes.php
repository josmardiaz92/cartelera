<?php
// Datos de conexión a la base de datos
$host = 'localhost';
$dbname = 'hsa_gestorcola';
$username = 'root';
$password = '';

// Conexión a la base de datos
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_EMULATE_PREPARES => false,
];
try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    die('Error de conexión: ' . $e->getMessage());
}

// Consulta a la base de datos
$query = 'select * from multimedia where est_mul="A"';
$stmt = $pdo->query($query);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Depuración
if ($result === false) {
    die('Error al ejecutar la consulta SQL: ' . print_r($stmt->errorInfo(), true));
}

// Devolver resultados como JSON
header('Content-Type: application/json');
echo json_encode($result);
?>
