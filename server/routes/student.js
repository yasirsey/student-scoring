const router = require('express').Router()

const auth = require('../middlewares/auth')

const students = require('../controllers/student')

router.get('/', students.getAll)

router.post('/',auth.admin, students.create)

router.patch('/',auth.admin, students.update)

router.delete('/:id',auth.admin, students.remove)

module.exports = router