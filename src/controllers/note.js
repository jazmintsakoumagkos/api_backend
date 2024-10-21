'use strict'

const note = require('../models/note');
var Note = require ('../models/note')

var controller = {

    // guardar

    save : (req,res) => {
 
//obtener los datos
        var params = req.body;
//objetos a guardar
        var note= new Note();
        //asignar los valores

        note.title = params.title;
        note.description = params.description;
        //guardar el articulo en DB
        
        note.save((err, noteStored) => {

            if(err || !noteStored){
                return res.status(404).send({
                    status: 'Error',
                    message: 'La nota no se ha guardado'
                })
            }

            return res.status(200).send({
                status: 'success',
                noteStored
            })

        })
    },

    getNotes: (req,res) => {
        var query = Note.find({});

        query.sort('-date').exec((err, notes) =>{
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al extraer los datos'
                })
            }
            if(!notes){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No hay notas para mostrar'
                })
            }
            
            return res.status(404).send({
                status: 'Error',
                notes
            })

        })
    },

    delete : (req,res) => {

        var noteId = req.params.id;
        
        Note.findOneAndDelete({_id: noteId }, (err, noteRemoved) =>{
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al eliminar'
                })
            }
            
            if(!noteRemoved){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha encontrado la nota a eliminar'
                })
            }

            return res.status(200).send({
                status: 'success',
                note: noteRemoved
            })

        })
    },

    update: (req, res) => {
        var noteId = req.params.id;
        var params = req.body; // Accedemos directamente a req.body en lugar de req.body.params
        const { title, description } = params; // Usamos destructuring para simplificar
    
        Note.findOneAndUpdate(
            { _id: noteId },
            { title: title, description: description },
            { new: true }, // new: true asegura que obtendrás el documento actualizado
            (err, noteUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'Error',
                        message: 'Error al actualizar',
                    });
                }
    
                if (!noteUpdated) {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'La nota no existe',
                    });
                }
    
                return res.status(200).send({
                    status: 'success',
                    note: noteUpdated,
                });
            }
        );
    }}

    module.exports = controller;