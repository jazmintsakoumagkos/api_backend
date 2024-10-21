'use strict'

const express = require ('express');

var Note = require ('../controllers/note');
const note = require('../models/note');

var router = express.Router();

//guardar nota

router.post('/save', Note.save);

//obtener notas

router.get('/notes', Note.getNotes);

//eliminar
router.delete ('/delete/:id', Note.delete);

//actualizar nota

router.put ('/update/:id', Note.update);

module.exports = router; 