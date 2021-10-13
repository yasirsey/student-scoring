const Class = require('../models/Class')

const getAll = async (req, res, next) => {
    try {
        const data = await Class.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const create = async (req, res, next) => {
    try {
        const newClass = new Class({
            name: req.body.name
        })
        await newClass.save()
        res.status(200).json(newClass)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const update = async (req, res, next) => {
    try {
        const updated = await Class.findByIdAndUpdate(req.body.id, {
            name: req.body.name
        })
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const remove = async (req, res, next) => {
    try {
        await Class.findByIdAndDelete(req.params.id)
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
