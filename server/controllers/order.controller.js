const Basket = require('../models/Basket')
const BasketProduct = require('../models/BasketProduct')
const Order = require('../models/Order')
const OrderProduct = require('../models/OrderProduct')
const Check = require('../models/Check')
const PaymentMethod = require('../models/PaymentMethod')

class orderController {
    // --------- basket CRUD ----------
    async createBasket(req, res) {
        const { user, begin_date } = req.body
        await Basket.query()
            .insert({ user, begin_date })
            .then(basket => res.json(basket))
            .catch(err => res.json(err.message))
    }

    async updateBasket(req, res) {
        const id = req.params.id
        const { user, begin_date } = req.body
        await Basket.query()
            .patchAndFetchById(id, {
                user, begin_date
            })
            .then(basket => {
                if (basket === null) res.json("Такой корзины нет")
                else res.json(basket)
            })
            .catch(err => res.json(err.message))
    }

    async getBasketById(req, res) {
        const id = req.params.id
        await Basket.query()
            .select("*")
            .where("user", "=", id)
            .then(basket => res.json(basket))
            .catch(err => res.json(err.message))
    }

    // --------- basket product CRUD ----------
    async createBasketProduct(req, res) {
        const { basket, product } = req.body
        await BasketProduct.query()
            .insert({ basket, product })
            .then(basketProduct => res.json(basketProduct))
            .catch(err => res.json(err.message))
    }

    async deleteBasketProduct(req, res) {
        const id = req.params.id
        await BasketProduct.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой записи 'товар-корзина' нет")
                else res.json(`Товар-корзина с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getBasketProductById(req, res) {
        const id = req.params.id
        await BasketProduct.query()
            .findById(id)
            .then(basketProduct => res.json(basketProduct))
            .catch(err => res.json(err.message))
    }

    async getBasketProductsByBasket(req, res) {
        const basket = req.params.id
        await BasketProduct.query()
            .select("*")
            .where("basket", "=", basket)
            .then(basketProduct => res.json(basketProduct))
            .catch(err => res.json(err.message))
    }

    // --------- order CRUD ----------
    async createOrder(req, res) {
        const { user, date } = req.body
        await Order.query()
            .insert({ user, date })
            .then(order => res.json(order))
            .catch(err => res.json(err.message))
    }

    async deleteOrder(req, res) {
        const id = req.params.id
        await Order.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого заказа нет")
                else res.json(`Заказ с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getOrderById(req, res) {
        const id = req.params.id
        await Order.query()
            .findById(id)
            .then(order => res.json(order))
            .catch(err => res.json(err.message))
    }

    async getOrdersByUser(req, res) {
        const user = req.params.id
        await Order.query()
            .select("*")
            .where("user", "=", user)
            .then(order => res.json(order))
            .catch(err => res.json(err.message))
    }

    // --------- order product CRUD ----------
    async createOrderProduct(req, res) {
        const { order, product } = req.body
        await OrderProduct.query()
            .insert({ order, product })
            .then(orderProduct => res.json(orderProduct))
            .catch(err => res.json(err.message))
    }

    async deleteOrderProduct(req, res) {
        const id = req.params.id
        await OrderProduct.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого товара в заказе нет")
                else res.json(`Товар в заказе с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getOrderProductById(req, res) {
        const id = req.params.id
        await OrderProduct.query()
            .findById(id)
            .then(orderProduct => res.json(orderProduct))
            .catch(err => res.json(err.message))
    }

    async getOrderProductsByOrder(req, res) {
        const order = req.params.id
        await OrderProduct.query()
            .select("*")
            .where("order", "=", order)
            .then(orderProduct => res.json(orderProduct))
            .catch(err => res.json(err.message))
    }

    // --------- check CRUD ----------
    async createCheck(req, res) {
        const { order, payment_method, full_price } = req.body
        await Check.query()
            .insert({ order, payment_method, full_price })
            .then(check => res.json(check))
            .catch(err => res.json(err.message))
    }

    async getCheckByOrder(req, res) {
        const order = req.params.id
        await Check.query()
            .select("*")
            .where("order", "=", order)
            .then(check => res.json(check))
            .catch(err => res.json(err.message))
    }

    // --------- payment method CRUD ----------
    async createPaymentMethod(req, res) {
        const { name } = req.body
        await PaymentMethod.query()
            .insert({ name })
            .then(paymentMethod => res.json(paymentMethod))
            .catch(err => res.json(err.message))
    }

    async deletePaymentMethod(req, res) {
        const id = req.params.id
        await PaymentMethod.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого способа оплаты нет")
                else res.json(`Способ оплаты с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async updatePaymentMethod(req, res) {
        const id = req.params.id
        const { name } = req.body
        await PaymentMethod.query()
            .patchAndFetchById(id, {
                name
            })
            .then(paymentMethod => {
                if (paymentMethod === null) res.json("Такого способа оплаты нет")
                else res.json(paymentMethod)
            })
            .catch(err => res.json(err.message))
    }

    async getPaymentMethods(req, res) {
        await PaymentMethod.query()
            .then(paymentMethod => res.json(paymentMethod))
            .catch(err => res.json(err.message))
    }
}

module.exports = new orderController()