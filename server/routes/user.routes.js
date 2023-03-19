const Router = require('express')
const router = new Router()
const controller = require('../controllers/user.controller')

router.post('/user', controller.saveUser)
router.delete('/user/:id', controller.deleteUser)
router.get('/user/:id', controller.getUserById)
router.get('/user', controller.getUsers)
router.put('/user/:id', controller.updateUserById)


module.exports = router