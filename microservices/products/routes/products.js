const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

// Obtener todos los productos
router.get('/', (req, res) => {
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener productos' });
    } else {
      res.json(results);
    }
  });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  connection.query(
    'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
    [nombre, descripcion, precio, stock],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error al crear producto' });
      } else {
        res.json({ message: 'Producto creado exitosamente', productoId: results.insertId });
      }
    }
  );
});

module.exports = router;
