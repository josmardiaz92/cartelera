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

    $targetDir = "../imagenes/"; // Directorio donde se guardarán las imágenes subidas
    $allowedExtensions = array("jpg", "jpeg", "png", "gif");

    $imageFile = $_FILES["imagen"]["tmp_name"];
    $fileName = basename($_FILES["imagen"]["name"]);
    $targetFile = $targetDir . $fileName;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Verificar si el archivo es una imagen
    if (in_array($imageFileType, $allowedExtensions)) {
        if (move_uploaded_file($imageFile, $targetFile)) {
            $imageName = pathinfo($fileName, PATHINFO_FILENAME); // Obtener solo el nombre del archivo sin la extensión
            $imageExtension = $imageFileType;

            // Configurar la conexión a la base de datos (usando PDO)
            $pdo = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
            
            // Insertar la información de la imagen en la base de datos
            $stmt = $pdo->prepare("UPDATE multimedia SET url_mul = :url, ext_mul = :extension, ubi_mul = :ubicacion, are_mul = :area, dur_mul = :duracion, est_mul = :estatus WHERE cod_mul = :codigo");
            $stmt->bindParam(':url', $imageName);
            $stmt->bindParam(':extension', $imageExtension);
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
    } else {
        echo "Formato de archivo no válido. Se permiten solo imágenes en formato JPG, JPEG, PNG y GIF.";
    }
}
?>
