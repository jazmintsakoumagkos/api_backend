'use strict'

const mongoose = require ('mongoose')  ;
var Schema = mongoose.Schema;

var NoteSchema = new Schema ({

    title: String,
    date: {type: Date, default: Date.now},
    description: String
})

module.exports = mongoose.model ("Note", NoteSchema);