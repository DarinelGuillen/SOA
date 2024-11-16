const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json());

const productsRoutes = require('./routes/products');
app.use('/products', productsRoutes);

app.listen(3002, () => {
  console.log('Servicio de Productos corriendo en el puerto 3002');
});
