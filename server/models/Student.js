const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name: String,
    sClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    point: Number
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student