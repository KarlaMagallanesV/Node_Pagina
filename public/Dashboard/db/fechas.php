<?php
$host = 'db-lm.cqvfcleniqiw.us-east-1.rds.amazonaws.com'; 
$user = 'lmencia';
$password = 'Mencia71398927';
$database = 'calendario_db';
$port = 3306;

// Crear conexión
$conn = new mysqli($host, $user, $password, $database, $port);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $fecha = $_POST['fecha'];
    $imagen = $_FILES['imagen']['name']; 

    $targetDir = "uploads/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    $targetFile = $targetDir . basename($imagen);

    // Subir imagen al servidor
    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFile)) {
        $sql = "INSERT INTO eventos (titulo, descripcion, fecha, imagen) 
                VALUES ('$titulo', '$descripcion', '$fecha', '$imagen')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["mensaje" => "Evento agregado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al agregar evento: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Error al subir la imagen"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener eventos
    $sql = "SELECT * FROM eventos";
    $result = $conn->query($sql);

    $eventos = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $eventos[] = $row;
        }
    }
    echo json_encode($eventos);
}

// Cerrar conexión
$conn->close();
?>
