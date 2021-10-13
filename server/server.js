const express = require('express')
const cors = require('cors')

//config
require('dotenv').config({ path: `${__dirname}/config/.env` })
require('./config/database').connect()
//If there is no admin, create an admin.
require('./config/admin').config('admin', 'admin123')

//Express.js middlewares
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', require('./routes'))

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`)
})