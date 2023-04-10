const Router = require('express')
const router = new Router()
const controller = require('../controllers/user.controller')
const {body} = require('express-validator')

router.post('/registration', 
    body('password').isLength({min: 5, max: 35}),
    controller.registration)
router.post('/login')
router.post('/logout')
router.get('/refresh')

router.post('/user', controller.saveUser)
router.delete('/user/:id', controller.deleteUser)
router.get('/user/:id', controller.getUserById)
router.get('/user', controller.getUsers)
router.put('/user/:id', controller.updateUserById)


module.exports = router