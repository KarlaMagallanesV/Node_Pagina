<?php
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $conn = Database::getInstance();
        
        if (!$conn) {
            throw new Exception("No se pudo establecer la conexión a la base de datos.");
        }

        $nombres = $_POST['nombres'];
        $apellidos = $_POST['apellidos']; 
        $tipoDocumento = $_POST['tipoDocumento'];
        $numeroDocumento = $_POST['numeroDocumento'];
        $genero = $_POST['genero'];
        $edad = $_POST['edad'];
        $telefono = $_POST['telefono'];
        $gmail = $_POST['gmail'];
        $direccion = $_POST['direccion'];
        $mensaje = $_POST['mensaje'];

        $sql = "INSERT INTO contactos (nombres, apellidos, tipoDocumento, numeroDocumento, genero, edad, telefono, gmail, direccion, mensaje) 
                VALUES (:nombres, :apellidos, :tipoDocumento, :numeroDocumento, :genero, :edad, :telefono, :gmail, :direccion, :mensaje)";

        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            throw new Exception("Error al preparar la consulta SQL.");
        }

        $stmt->bindParam(':nombres', $nombres);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':tipoDocumento', $tipoDocumento);
        $stmt->bindParam(':numeroDocumento', $numeroDocumento);
        $stmt->bindParam(':genero', $genero);
        $stmt->bindParam(':edad', $edad);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':gmail', $gmail);
        $stmt->bindParam(':direccion', $direccion);
        $stmt->bindParam(':mensaje', $mensaje);

        $stmt->execute();

        echo "¡Datos guardados exitosamente!";

    } catch(PDOException $e) {
        echo "Error al guardar los datos: " . $e->getMessage();
    } catch(Exception $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
