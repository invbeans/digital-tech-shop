const Router = require('express')
const router = new Router()
const controller = require('../controllers/order.controller')

// --------- basket CRUD ----------
router.post('/basket', controller.createBasket)
router.put('/basket/:id', controller.updateBasket)
router.get('/basket/:id', controller.getBasketById)

// --------- basket product CRUD ----------
router.post('/basket_product', controller.createBasketProduct)
router.delete('/basket_product/:id', controller.deleteBasketProduct)
router.get('/basket_product/by_basket/:id', controller.getBasketProductsByBasket)
router.get('/basket_product/:id', controller.getBasketProductById)

// --------- order CRUD ----------
router.post('/order', controller.createOrder)
router.delete('/order/:id', controller.deleteOrder)
router.get('/order/by_user/:id', controller.getOrdersByUser)
router.get('/order/:id', controller.getOrderById)

// --------- order product CRUD ----------
router.post('/order_product', controller.createOrderProduct)
router.delete('/order_product/:id', controller.deleteOrderProduct)
router.get('/order_product/by_order/:id', controller.getOrderProductsByOrder)
router.get('/order_product', controller.getOrderProductById)

// --------- check CRUD ----------
router.post('/check', controller.createCheck)
router.get('/check/by_order/:id', controller.getCheckByOrder)

// --------- payment method CRUD ----------
router.post('/payment_method', controller.createPaymentMethod)
router.delete('/payment_method/:id', controller.deletePaymentMethod)
router.put('/payment_method/:id', controller.updatePaymentMethod)
router.get('/payment_method', controller.getPaymentMethods)

module.exports = router