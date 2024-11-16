const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json());

const ordersRoutes = require('./routes/orders');
app.use('/orders', ordersRoutes);

app.listen(3003, () => {
  console.log('Servicio de Pedidos corriendo en el puerto 3003');
});
