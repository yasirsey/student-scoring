const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    name: String
})

const Class = mongoose.model('Class', classSchema)

module.exports = Class