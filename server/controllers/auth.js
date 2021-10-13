const jwt = require('jsonwebtoken')

const Admin = require('../models/Admin')

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body
    
        if(!(username && password))
            return res.status(400).json({ error: 'Username and password required.' })
        
        const admin = await Admin.findOne({ username })

        if(!admin) return res.status(404).json({ error: 'Admin not found.' })

        admin.comparePassword(password, function(error, isMatch) {
            if(error) return res.status(500).json({ error })

            if(!isMatch) return res.status(400).json({ error: 'Wrong password.' })

            const token = jwt.sign(
                {
                    id: admin._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )

            res.status(201).json({ token })
        })

    } catch (error) {
        const errorMessage = error.message.split(':').at(-1).trim() || error.message
        return res.status(400).json({ error: errorMessage })
    }
}

const me = async (req, res, next) => {
    try {

        const admin = await Admin.findById(req.adminData.id)

        if(!admin) return res.status(404).json({ error: 'Admin not found.' })

        res.status(200).json({ user: admin })

    } catch (error) {
        const errorMessage = error.message.split(':').at(-1).trim() || error.message
        return res.status(400).json({ error: errorMessage })
    }
}

module.exports = {
    login,
    me
}