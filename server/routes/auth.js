const router = require('express').Router()

const authMiddleware = require('../middlewares/auth')

const auth = require('../controllers/auth')

router.post('/login', auth.login)

router.get('/me',authMiddleware.admin, auth.me)

module.exports = router