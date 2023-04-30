const Router = require('express')
const router = new Router()
const controller = require('../controllers/order.controller')
const userMiddleware = require('../middlewares/user-auth.middleware')

// --------- basket CRUD ----------
router.post('/basket', controller.createBasket)
router.post('/basket/by_user', userMiddleware, controller.getOrCreateBasket)
router.put('/basket/:id', controller.updateBasket)
router.get('/basket/:id', controller.getBasketById)
router.delete('/basket/by_user', userMiddleware, controller.deleteBasket)

// --------- basket product CRUD ----------
router.post('/basket_product', userMiddleware, controller.createBasketProduct)
router.delete('/basket_product/by_product/:id', userMiddleware, controller.deleteBasketProductByProduct)
router.get('/product/by_basket', userMiddleware, controller.getProductsByBasket)
router.get('/basket_product/by_basket/:id', controller.getBasketProductsByBasket)
router.get('/basket_product/:id', controller.getBasketProductById)

// --------- order CRUD ----------
router.post('/order', controller.createOrder)
router.post('/make_order', userMiddleware, controller.makeOrder)
router.delete('/order/:id', controller.deleteOrder)
router.get('/order/by_user', userMiddleware, controller.getOrdersByUser)
router.get('/order/:id', controller.getOrderById)

// --------- order product CRUD ----------
router.post('/order_product', controller.createOrderProduct)
router.delete('/order_product/:id', controller.deleteOrderProduct)
router.get('/product/by_order/:id', userMiddleware, controller.getProductsByOrder)
router.get('/short_product/by_order/:id', userMiddleware, controller.getShortProductsByOrder)
router.get('/order_product/by_order/:id', userMiddleware, controller.getOrderProductsByOrder)
router.get('/order_product/:id', controller.getOrderProductById)

// --------- check CRUD ----------
router.post('/check', controller.createCheck)
router.get('/check/by_order/:id', userMiddleware, controller.getCheckByOrder)

// --------- payment method CRUD ----------
router.post('/payment_method', controller.createPaymentMethod)
router.delete('/payment_method/:id', controller.deletePaymentMethod)
router.put('/payment_method/:id', controller.updatePaymentMethod)
router.get('/payment_method', controller.getPaymentMethods)

module.exports = router