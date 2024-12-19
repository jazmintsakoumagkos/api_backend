'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/note');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const port = 3000;


const dbconnect = async () => {
  try {
    mongoose.set('strictQuery', true); 
    await mongoose.connect('mongodb://127.0.0.1:27017/lista_tareas'); 
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
