const jwt = require('jsonwebtoken')

const Admin = require('../models/Admin')

const admin = async (req, res, next) => {
    try {
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        const admin = await Admin.findById(decodedToken.id)

        if(admin && admin.isBlocked) throw 'Auth failed.'

        req.adminData = decodedToken

        next()

    } catch (error) {
        return res.status(401).json({error: 'Auth failed'})
    }
}

module.exports = {
    admin
}