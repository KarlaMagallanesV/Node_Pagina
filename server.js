// Dependencias y configuraciones iniciales
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de la aplicación
const app = express();

// Configuración del puerto y del host para IP pública
const PORT = 4000;
const HOST = '23.20.188.88'; // Escucha en todas las interfaces de red

// Configuración de la base de datos
const pool = mysql.createPool({
    host: 'pagina.cvmzvzzusrz8.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'conejitos10',
    database: 'dbGeneral',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Configuración de la carpeta 'uploads' para almacenar imágenes
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de Multer para la subida de imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Solo se permiten imágenes JPG, JPEG o PNG.'));
        }
        cb(null, true);
    }
});

// Middleware para analizar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar la carpeta 'public' para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Dashboard.html'));
});

app.post('/public/Salud-Bienestar/php/form.php', (req, res) => {
    const { nombres, apellidos, tipoDocumento, numeroDocumento, genero, edad, telefono, gmail, direccion, mensaje } = req.body;

    if (!nombres || !apellidos || !tipoDocumento || !numeroDocumento || !genero || !edad || !telefono || !gmail || !direccion || !mensaje) {
        return res.status(400).send('Por favor completa todos los campos del formulario.');
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err.stack);
            return res.status(500).send('Ocurrió un error al procesar tu consulta.');
        }

        const query = `
            INSERT INTO contactos (nombres, apellidos, tipoDocumento, numeroDocumento, genero, edad, telefono, gmail, direccion, mensaje)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        connection.query(query, [nombres, apellidos, tipoDocumento, numeroDocumento, genero, edad, telefono, gmail, direccion, mensaje], (err, result) => {
            if (err) {
                console.error('Error al insertar datos en contactos: ' + err.stack);
                return res.status(500).send('Ocurrió un error al procesar tu consulta.');
            }
            res.redirect('/');
            connection.release();
        });
    });
});

app.post('/agregar-evento', upload.single('imagen'), (req, res) => {
    const { titulo, descripcion, fecha } = req.body;
    const imagen = req.file ? req.file.filename : null;

    if (!titulo || !descripcion || !fecha) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    if (!imagen) {
        return res.status(400).json({ error: 'La imagen es requerida.' });
    }

    const query = 'INSERT INTO eventos (titulo, descripcion, fecha, imagen) VALUES (?, ?, ?, ?)';
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error de conexión:', err.stack);
            return res.status(500).json({ error: 'Error al conectar con la base de datos.' });
        }

        connection.query(query, [titulo, descripcion, fecha, imagen], (err, result) => {
            connection.release();
            if (err) {
                console.error('Error al insertar en la base de datos:', err.stack);
                return res.status(500).json({ error: 'Error al guardar el evento.' });
            }

            res.status(200).json({
                id: result.insertId,
                titulo,
                descripcion,
                fecha,
                imagen
            });
        });
    });
});

app.post('/reservas', (req, res) => {
    const { nombre, telefono, personas, fecha, hora, mensaje } = req.body;

    if (!nombre || !telefono || !personas || !fecha || !hora) {
        return res.status(400).send('Por favor completa todos los campos del formulario.');
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err.stack);
            return res.status(500).send('Ocurrió un error al procesar tu consulta.');
        }

        const query = `
            INSERT INTO reservas (nombre, telefono, personas, fecha, hora, mensaje)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        connection.query(query, [nombre, telefono, personas, fecha, hora, mensaje], (err, result) => {
            if (err) {
                console.error('Error al insertar datos en reservas: ' + err.stack);
                return res.status(500).send('Ocurrió un error al procesar tu reserva.');
            }
            res.redirect('/');
            connection.release();
        });
    });
});

// Iniciar el servidor
app.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
