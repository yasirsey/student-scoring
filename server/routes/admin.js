const router = require('express').Router()

const admins = require('../controllers/admin')

router.get('/', admins.getAll)

router.post('/', admins.create)

router.patch('/', admins.update)

router.delete('/', admins.remove)

module.exports = router