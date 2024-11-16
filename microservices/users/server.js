const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json());

const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

app.listen(3001, () => {
  console.log('Servicio de Usuarios corriendo en el puerto 3001');
});
