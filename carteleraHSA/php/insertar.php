<?php
// Datos de conexión a la base de datos
$host = 'localhost';
$dbname = 'hsa_gestorcola';
$username = 'root';
$password = '';

// Recibir los datos enviados desde JavaScript
$datos = json_decode(file_get_contents('php://input'), true);

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

// Insertar los datos en la base de datos
foreach ($datos as $linea) {
  // Dividir la línea en paciente y consultorio
    $valores = explode(',', $linea);
    $paciente = trim(substr($valores[0], strpos($valores[0], ':')+1));
    $consultorio = trim(substr($valores[1], strpos($valores[1], ':')+1));

  // Preparar y ejecutar la consulta INSERT
  $stmt = $pdo->prepare("INSERT INTO turno (nom_tur, fky_con) VALUES (?, ?)");
  $stmt->execute([$paciente, $consultorio]);
}

// Devolver respuesta al cliente
header('Content-Type: application/json');
echo json_encode(['success' => true]);
?>
