const Student = require('../models/Student')

const getAll = async (req, res, next) => {
    try {
        let data
        if(!req.query.sClass)
            data = await Student.find().populate('sClass')
        else
            data = await Student.find({ sClass: req.query.sClass }).populate('sClass')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const create = async (req, res, next) => {
    try {
        const { name, sClass, point } = req.body
        const newStudent = new Student({
            name, sClass, point
        })
        await newStudent.save()
        res.status(200).json(newStudent)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const update = async (req, res, next) => {
    try {
        const { name, sClass, point } = req.body
        const updated = await Student.findByIdAndUpdate(req.body.id, {
            name, sClass, point
        })
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const remove = async (req, res, next) => {
    try {
        await Student.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Deleted' })
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove
}