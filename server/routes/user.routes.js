const Router = require('express')
const router = new Router()
const controller = require('../controllers/user.controller')
const adminAuthMiddleware = require('../middlewares/admin-auth.middleware')

router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/logout', controller.logout)
router.get('/refresh', controller.refresh)

//------------ admin routes ---------------------
router.get('/user', adminAuthMiddleware, controller.getUsers)
router.put('/user/change_role/:id', adminAuthMiddleware, controller.changeUserRole)
router.post('/user/by_surname', adminAuthMiddleware, controller.findUserBySurname)

router.get('/role', controller.getRoles)

router.post('/user', controller.saveUser)
router.delete('/user/:id', controller.deleteUser)
router.get('/user/:id', controller.getUserById)
router.put('/user/:id', controller.updateUserById)


module.exports = router