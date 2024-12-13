<?php
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $conn = Database::getInstance();
        
        if (!$conn) {
            throw new Exception("No se pudo establecer la conexión a la base de datos.");
        }

        $nombre = isset($_POST['name']) ? $_POST['name'] : '';
        $telefono = isset($_POST['phone']) ? $_POST['phone'] : '';
        $personas = isset($_POST['person']) ? $_POST['person'] : '';
        $fecha_reserva = isset($_POST['reservation-date']) ? $_POST['reservation-date'] : '';
        $hora_reserva = isset($_POST['reservation-time']) ? $_POST['reservation-time'] : '';
        $mensaje = isset($_POST['message']) ? $_POST['message'] : '';

        $sql = "INSERT INTO reservas (nombre, telefono, personas, fecha, hora, mensaje) 
                VALUES (:nombre, :telefono, :personas, :fecha, :hora, :mensaje)";

        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            throw new Exception("Error al preparar la consulta SQL.");
        }

        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':personas', $personas);
        $stmt->bindParam(':fecha', $fecha_reserva);
        $stmt->bindParam(':hora', $hora_reserva);
        $stmt->bindParam(':mensaje', $mensaje);

        $stmt->execute();

        echo "¡Reserva guardada exitosamente!";

    } catch(PDOException $e) {
        echo "Error al guardar la reserva: " . $e->getMessage();
        error_log("Error PDO: " . $e->getMessage());
    } catch(Exception $e) {
        echo "Error: " . $e->getMessage();
        error_log("Error general: " . $e->getMessage());
    }
}
?>
