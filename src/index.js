'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/note');

// Cargar las variables de entorno
require('dotenv').config(); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; // Usar el puerto de la variable de entorno, si no está disponible, usar 3000.

const dbconnect = async () => {
  try {
    mongoose.set('strictQuery', true); 
    await mongoose.connect(process.env.MONGO_URI); // Usar la URI de MongoDB desde las variables de entorno
    console.log('Conexión correcta a la base de datos');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    process.exit(1); 
  }
};

dbconnect();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api', noteRoutes);

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
