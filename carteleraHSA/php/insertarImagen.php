<?php
$host = 'localhost';
$database = 'cartelera';
$user = 'supervisor';
$password = 'imagenes1234';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $ubicacion = $_POST["ubicacion"];
    $area = $_POST["area"];
    $duracion = $_POST["duracion"];

    $targetDir = "../imagenes/"; // Directorio donde se guardarán las imágenes subidas
    $allowedExtensions = array("jpg", "jpeg", "png", "gif");

    $uploadedFiles = array();
    foreach ($_FILES["imagen"]["tmp_name"] as $key => $tmpName) {
        $imageFile = $_FILES["imagen"];
        $fileName = basename($imageFile["name"][$key]);
        $targetFile = $targetDir . $fileName;
        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

        // Verificar si el archivo es una imagen
        if (in_array($imageFileType, $allowedExtensions)) {
            if (move_uploaded_file($tmpName, $targetFile)) {
                $imageName = pathinfo($fileName, PATHINFO_FILENAME); // Obtener solo el nombre del archivo sin la extensión
                $imageExtension = $imageFileType;

                // Configurar la conexión a la base de datos (usando PDO)
                $pdo = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
                
                // Insertar la información de la imagen en la base de datos
                $stmt = $pdo->prepare("INSERT INTO multimedia (url_mul, ext_mul, ubi_mul, are_mul, dur_mul) VALUES (:url, :extension, :ubicacion, :area, :duracion)");
                $stmt->bindParam(':url', $imageName);
                $stmt->bindParam(':extension', $imageExtension);
                $stmt->bindParam(':ubicacion', $ubicacion);
                $stmt->bindParam(':area', $area);
                $stmt->bindParam(':duracion', $duracion);
                $result = $stmt->execute();

                $uploadedFiles[] = $fileName;
            }
        }
    }
    if (count($uploadedFiles) > 0) {
        $response = array("success" => $result);
        echo json_encode($response);
    }else{
        // En caso de error, también se envía un objeto JSON
        $response = array("success" => false);
        echo json_encode($response);
    }

}
?>
