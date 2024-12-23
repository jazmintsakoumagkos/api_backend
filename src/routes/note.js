'use strict'

const express = require ('express');

var Note = require ('../controllers/note');
const note = require('../models/note');

var router = express.Router();



router.post('/save', Note.save);



router.get('/notes/:id', Note.getNoteById);


router.delete ('/delete/:id', Note.delete);



router.put ('/update/:id', Note.update);

module.exports = router; 