<?php
require_once 'conexion.php';

// Verificar el método de la solicitud 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $conn = Database::getInstance();
        
        // Procesar la imagen si se subió una
        $imagen = null;
        if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === 0) {
            $targetDir = "../../uploads/";
            if (!file_exists($targetDir)) {
                mkdir($targetDir, 0777, true);
            }
            
            $fileName = uniqid() . '_' . basename($_FILES['imagen']['name']);
            $targetPath = $targetDir . $fileName;
            
            if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetPath)) {
                $imagen = 'uploads/' . $fileName;
            }
        }

        // Preparar y ejecutar la consulta de inserción
        $stmt = $conn->prepare("INSERT INTO eventos (titulo, descripcion, fecha, imagen) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $_POST['titulo'],
            $_POST['descripcion'] ?? null,
            $_POST['fecha'],
            $imagen
        ]);

        // Obtener el ID del evento recién insertado
        $eventoId = $conn->lastInsertId();
        
        // Devolver el evento creado
        $stmt = $conn->prepare("SELECT * FROM eventos WHERE id = ?");
        $stmt->execute([$eventoId]);
        $evento = $stmt->fetch(PDO::FETCH_ASSOC);
        
        header('Content-Type: application/json');
        echo json_encode($evento, JSON_UNESCAPED_UNICODE);
        exit;
        
    } catch (PDOException $e) {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(['error' => 'Error al guardar el evento: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// Si es una solicitud GET, devolver todos los eventos
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $conn = Database::getInstance();
        $stmt = $conn->query("SELECT * FROM eventos ORDER BY fecha DESC");
        $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        header('Content-Type: application/json');
        echo json_encode($eventos, JSON_UNESCAPED_UNICODE);
        exit;
        
    } catch (PDOException $e) {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(['error' => 'Error al obtener los eventos: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
?>
