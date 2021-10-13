const router = require('express').Router()

const auth = require('../middlewares/auth')

const classes = require('../controllers/class')

router.get('/', classes.getAll)

router.post('/',auth.admin ,classes.create)

router.patch('/',auth.admin, classes.update)

router.delete('/:id',auth.admin, classes.remove)

module.exports = router
