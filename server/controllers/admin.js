const Admin = require('../models/Admin')

const getAll = async (req, res, next) => {
    try {
        const data = await Admin.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const create = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const newAdmin = new Admin({
            username, password
        })
        await newAdmin.save()
        res.status(200).json(newAdmin)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const update = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const updated = await Admin.findByIdAndUpdate(req.body.id, {
            username, password
        })
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const remove = async (req, res, next) => {
    try {
        await Admin.findByIdAndDelete(req.body.id)
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
