const mongoose = require('mongoose')

const connect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to db.'))
    .catch((err) => console.log(err))
}

module.exports = {
    connect
}