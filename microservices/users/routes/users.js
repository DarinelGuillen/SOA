const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'SOA',
  password: process.env.DB_PASS || '',
});
// Obtener todos los usuarios
router.get('/', (req, res) => {
  connection.query('SELECT id, nombre, email FROM usuarios', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    } else {
      res.json(results);
    }
  });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { nombre, email, password } = req.body;
  connection.query(
    'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
    [nombre, email, password],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error al crear usuario' });
      } else {
        res.json({ message: 'Usuario creado exitosamente', usuarioId: results.insertId });
      }
    }
  );
});

module.exports = router;
