'use strict'

const note = require('../models/note');
var Note = require ('../models/note')

var controller = {

    

    save: async (req, res) => {
        try {
            const { title, description } = req.body;
    
          
            const note = new Note({
                title,
                description,
            });
            const noteStored = await note.save();
    
           
            return res.status(201).send({
                status: 'success',
                note: noteStored,
            });
        } catch (err) {
            return res.status(500).send({
                status: 'Error',
                message: 'La nota no se ha guardado',
                error: err.message,
            });
        }
    },
    getNoteById: async (req, res) => {
        try {
            const noteId = req.params.id;
            const note = await Note.findById(noteId);
    
            if (!note) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'Nota no encontrada',
                });
            }
    
            return res.status(200).send({
                status: 'success',
                note,
            });
        } catch (err) {
            return res.status(500).send({
                status: 'Error',
                message: 'Error al obtener la nota',
                error: err.message,
            });
        }
    },

    delete: async (req, res) => {
        try {
            const noteId = req.params.id;
    
            if (!noteId) {
                return res.status(400).send({
                    status: 'Error',
                    message: 'El ID de la nota es requerido',
                });
            }
    
          
            const noteRemoved = await Note.findByIdAndDelete(noteId);
    
            if (!noteRemoved) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se encontró la nota para eliminar',
                });
            }
    
            return res.status(200).send({
                status: 'success',
                message: 'Nota eliminada correctamente',
                note: noteRemoved,
            });
        } catch (err) {
            return res.status(500).send({
                status: 'Error',
                message: 'Error al eliminar la nota',
                error: err.message,
            });
        }
    },

    update: async (req, res) => {
        try {
            const noteId = req.params.id;
            const { title, description } = req.body;
    
            if (!title || !description) {
                return res.status(400).send({
                    status: 'Error',
                    message: 'El título y la descripción son obligatorios',
                });
            }
    
            const noteUpdated = await Note.findByIdAndUpdate(
                noteId,
                { title, description },
                { new: true } 
            );
    
            if (!noteUpdated) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se encontró la nota para actualizar',
                });
            }
    
            return res.status(200).send({
                status: 'success',
                message: 'Nota actualizada correctamente',
                note: noteUpdated,
            });
        } catch (err) {
            return res.status(500).send({
                status: 'Error',
                message: 'Error al actualizar la nota',
                error: err.message,
            });
        }
    }}
    

    module.exports = controller;