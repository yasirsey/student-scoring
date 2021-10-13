const Admin = require('../models/Admin')

const config = async (username, password) => {
    const isAdminHere = await Admin.find({username})
    if(!isAdminHere.length) {
        const admin = new Admin({
            username,
            password
        })
    
        await admin.save()
    }
}

module.exports = {
    config
}