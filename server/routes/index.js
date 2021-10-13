const router = require('express').Router()

const authMiddleware = require('../middlewares/auth')

const auth = require('./auth')
const admin = require('./admin')
const classes = require('./class')
const students = require('./student')

router.use('/auth', auth)

router.use('/admins', authMiddleware.admin, admin)

router.use('/classes', classes)

router.use('/students', students)

module.exports = router