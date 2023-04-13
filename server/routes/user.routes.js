const Router = require('express')
const router = new Router()
const controller = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/logout', controller.logout)
router.get('/refresh', controller.refresh)

router.post('/user', controller.saveUser)
router.delete('/user/:id', controller.deleteUser)
router.get('/user/:id', controller.getUserById)
router.get('/user', authMiddleware, controller.getUsers)
router.put('/user/:id', controller.updateUserById)


module.exports = router