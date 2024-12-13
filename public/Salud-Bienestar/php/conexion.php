<?php
class Database {
    private static $instance = null;
    private $conn;
    
    // Configuración de la base de datos
    private $servername = "pagina.cvmzvzzusrz8.us-east-1.rds.amazonaws.com";
    private $username = "admin"; 
    private $password = "conejitos10";
    private $dbname = "dbgeneral";

    private function __construct() {
        try {
            // Configurar la conexión con charset utf8mb4
            $dsn = "mysql:host=" . $this->servername . ";dbname=" . $this->dbname . ";charset=utf8mb4";
            
            // Opciones para mejorar la seguridad y el rendimiento
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_PERSISTENT => true // Conexiones persistentes
            ];
            
            // Establecer la conexión
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            
            // Mensaje de conexión exitosa más visible
            echo '<div style="background-color: #dff0d8; color: #3c763d; padding: 10px; margin: 10px; border: 1px solid #d6e9c6; border-radius: 4px;">';
            echo 'Conexión exitosa a la base de datos';
            echo '</div>';
            
        } catch(PDOException $e) {
            // Manejo de errores mejorado
            echo "<div style='color:red; padding:10px; border:1px solid red;'>";
            echo "Error de conexión: " . $e->getMessage();
            echo "<br>Verifique que:";
            echo "<ul>";
            echo "<li>El servidor MySQL esté activo</li>";
            echo "<li>Las credenciales sean correctas</li>";
            echo "<li>La base de datos 'dbGeneral' exista</li>";
            echo "</ul>";
            echo "</div>";
            die();
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance->conn;
    }

    public static function closeConnection() {
        self::$instance = null;
    }
    
    // Método para verificar el estado de la conexión
    public static function checkConnection() {
        try {
            $conn = self::getInstance();
            return $conn->getAttribute(PDO::ATTR_CONNECTION_STATUS);
        } catch(PDOException $e) {
            return false;
        }
    }
}

// Verificación del archivo y la conexión
if (!is_file(__FILE__)) {
    die("Error: No se puede acceder al archivo de conexión");
}

// Probar la conexión inmediatamente
Database::getInstance();
?>
