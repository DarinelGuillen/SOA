const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
};

// Realizar un nuevo pedido
router.post('/', async (req, res) => {
  const { usuario_id, items } = req.body;

  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.beginTransaction();

    // Calcular el total del pedido
    let total = 0;
    for (const item of items) {
      const [rows] = await connection.execute('SELECT precio FROM productos WHERE id = ?', [
        item.producto_id,
      ]);
      if (rows.length === 0) {
        throw new Error('Producto no encontrado');
      }
      total += rows[0].precio * item.cantidad;
    }

    // Insertar en la tabla de pedidos
    const [pedidoResult] = await connection.execute(
      'INSERT INTO pedidos (usuario_id, total) VALUES (?, ?)',
      [usuario_id, total]
    );
    const pedidoId = pedidoResult.insertId;

    // Insertar en la tabla de detalles de pedidos
    for (const item of items) {
      await connection.execute(
        'INSERT INTO pedido_detalles (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [pedidoId, item.producto_id, item.cantidad, item.precio_unitario]
      );
    }

    await connection.commit();
    res.json({ message: 'Pedido realizado exitosamente', pedidoId, total });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    await connection.end();
  }
});

// Obtener todos los pedidos
router.get('/', async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [pedidos] = await connection.execute('SELECT * FROM pedidos');
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  } finally {
    await connection.end();
  }
});

module.exports = router;
