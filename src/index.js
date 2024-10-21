'use strict'

const express = require ('express');
const app = express ();
const bodyParser = require('body-parser');

const port = 3000
 var noteRoutes = require ('./routes/note');

const mongoose = require ('mongoose');
const dbconnect = () => {
    function dbconnect() {
        
    }
    mongoose.set('strictQuery', true)
    mongoose.connect("mongodb://127.0.0.1:27017/lista_tareas", {},(err,res) => {
        if (!err) {
            console.log("conexión correcta");
        }
        else {
            console.log("error de conexión");
        }
    })
}

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Headers', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    next();

});

app.use('/api', noteRoutes);

app.listen(port,() => {
    console.log( "Servidor ejecutándose en el puerto" + port );
})
