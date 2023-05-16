const Router = require('express')
const router = new Router()
const controller = require('../controllers/activity.controller')
const userMiddleware = require('../middlewares/user-auth.middleware')
const managerMiddleware = require('../middlewares/manager-auth.middleware')

// --------- review CRUD ----------
router.post('/review', userMiddleware, controller.createReview)
router.put('/review/:id', controller.updateReview)
router.delete('/review/:id', controller.deleteReview)
router.get('/review/by_product/:id', controller.getReviewByProductForProdPage)

// --------- question CRUD ----------
router.post('/question', userMiddleware, controller.createQuestion)
router.put('/question/:id', controller.updateQuestion)
router.delete('/question/:id', controller.deleteQuestion)
router.get('/question/by_product/:id', controller.getQuestionByProductForProdPage)

// --------- answer CRUD ----------
router.post('/answer', managerMiddleware, controller.createAnswer)
router.put('/answer/:id', controller.updateAnswer)
router.delete('/answer/:id', controller.deleteAnswer)
router.get('/answer/by_question/:id', controller.getAnswerByQuestionForProdPage)

// --------- return application CRUD ----------
router.post('/return_application', userMiddleware, controller.createReturnApplication)
router.put('/return_application/change_status/:id', managerMiddleware, controller.changeReturnApplicationStatus)
router.put('/return_application/:id', controller.updateReturnApplication)
router.delete('/return_application/:id', controller.deleteReturnApplication)
router.get('/return_application/by_user', userMiddleware, controller.getReturnApplicationsByUser)
router.get('/return_application', managerMiddleware, controller.getReturnApplications)

// --------- return product CRUD ----------
router.post('/return_product', controller.createReturnProduct)
router.delete('/return_product/:id', controller.deleteReturnProduct)
router.get('/return_product/by_return_application/:id', managerMiddleware, controller.getReturnProductByReturnApplication)

module.exports = router