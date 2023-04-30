const Basket = require('../models/Basket')
const BasketProduct = require('../models/BasketProduct')
const Order = require('../models/Order')
const OrderProduct = require('../models/OrderProduct')
const Check = require('../models/Check')
const PaymentMethod = require('../models/PaymentMethod')
const Product = require('../models/Product')
const ProductImage = require('../models/ProductImage')
const ProductRemains = require('../models/ProductRemains')

class orderController {
    // --------- basket CRUD ----------
    async createBasket(req, res) { //взмж стоит снести
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
    } //вот по сюда как раз и снести..... :D

    async getOrCreateBasket(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            let { user, begin_date } = req.body
            if (!user) {
                user = req.userData.id
            }
            await Basket.query()
                .where('user', user)
                .then(async basket => {
                    if (basket.length == 0) {
                        await Basket.query()
                            .insert({ user, begin_date })
                            .then(newBasket => {
                                res.json(newBasket)
                            })
                    } else {
                        res.json(basket[0])
                    }
                })
                .catch(err => res.json(err.message))
        }
    }

    async deleteBasket(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            let user = req.userData.id
            await Basket.query()
                .delete()
                .where('user', user)
                .then(amount => {
                    if (amount == 0) res.json("Такой корзины нет")
                    else res.json(`Корзина с id = ${user} удалена`)
                })
                .catch(err => res.json(err.message))
        }
    }

    // --------- basket product CRUD ----------
    async createBasketProduct(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const { product } = req.body
            let user = req.userData.id
            let begin_date = new Date().toISOString()
            await Basket.query()
                .where('user', user)
                .then(async basket => {
                    if (basket.length == 0) {
                        await Basket.query()
                            .insert({ user, begin_date })
                            .then(async () => {
                                await BasketProduct.query()
                                    .insert({ basket: user, product })
                                    .then(basketProduct => res.json(basketProduct))
                            })
                    } else {
                        await BasketProduct.query()
                            .insert({ basket: user, product })
                            .then(basketProduct => {
                                res.json(basketProduct)
                            })
                    }
                })
                .catch(err => res.json(err.message))
        }

    }

    async deleteBasketProductByProduct(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const product = req.params.id
            await BasketProduct.query()
                .delete()
                .where('product', product)
                .then(amount => {
                    if (amount == 0) res.json("Такой записи 'товар-корзина' нет")
                    else res.json(`Товар-корзина с id = ${id} удалена`)
                })
                .catch(err => res.json(err.message))
        }
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

    async getProductsByBasket(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const basket = req.userData.id
            let prods = []
            await Product.query()
                .select("product.*")
                .joinRelated('basket_product_rel')
                .where('basket_product_rel.basket', basket)
                .then(async products => {
                    for (const product of products) {
                        let prodElem = {}
                        prodElem = { ...product }
                        await ProductImage.query().where('product', '=', product.id).then(productImg => { prodElem.image_link = productImg[0].image_link })
                        await ProductRemains.query().where('product', '=', product.id).then(productAmt => { prodElem.amount = productAmt[0].amount })
                        prods.push(prodElem)
                    }
                    res.json(prods)
                })
                .catch(err => res.json(err.message))
        }
    }

    // --------- order CRUD ----------
    async createOrder(req, res) {
        const { user, date } = req.body
        await Order.query()
            .insert({ user, date })
            .then(order => res.json(order))
            .catch(err => res.json(err.message))
    }

    async makeOrder(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            let { date, products, payment_method, full_price } = req.body
            let user = req.userData.id
            await Order.query()
                .insert({ user, date })
                .then(async order => {
                    for (let product of products) {
                        for (let i = 0; i < product.count; i++) {
                            await OrderProduct.query()
                                .insert({ product: product.product.id, order: order.id })
                                .then(async () => {
                                    await Basket.query()
                                        .delete()
                                        .where('user', user)
                                        .then(() => { })
                                })
                        }
                    }
                    await Check.query()
                        .insert({ order: order.id, payment_method: payment_method.id, full_price })
                        .then(() => {
                            res.json({ order: order.id, user: user })
                        })
                })
                .catch(err => res.json(err.message))
        }
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
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            let user = req.userData.id
            await Order.query()
                .select("*")
                .where("user", user)
                .then(order => res.json(order))
                .catch(err => res.json(err.message))
        }
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
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            let user = req.userData.id
            const order = req.params.id
            await OrderProduct.query()
                .joinRelated("order_rel")
                .where("order_rel.id", order)
                .select("order_product.*")
                .then(orderProduct => res.json(orderProduct))
                .catch(err => res.json(err.message))
        }
    }

    async getProductsByOrder(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const order = req.params.id
            let user = req.userData.id
            let prods = []
            await Product.query()
                .joinRelated('order_product_rel.order_rel')
                .where('order_product_rel:order_rel.id', order)
                .andWhere('order_product_rel:order_rel.user', user)
                .select("product.*")
                .then(async products => {
                    for (const product of products) {
                        let prodElem = {}
                        prodElem = { ...product }
                        await ProductImage.query().where('product', '=', product.id).then(productImg => { prodElem.image_link = productImg[0].image_link })
                        await ProductRemains.query().where('product', '=', product.id).then(productAmt => { prodElem.amount = productAmt[0].amount })
                        prods.push(prodElem)
                    }
                    res.json(prods)
                })
                .catch(err => res.json(err.message))
        }
    }

    async getShortProductsByOrder(req, res){
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            let user = req.userData.id
            const order = req.params.id
            await Product.query()
                .joinRelated("order_product_rel.order_rel")
                .where("order_product_rel:order_rel.id", order)
                .andWhere("order_product_rel:order_rel.user", user)
                .select("product.*")
                .then(orderProduct => res.json(orderProduct))
                .catch(err => res.json(err.message))
        }
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
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const order = req.params.id
            let user = req.userData.id
            await Check.query()
                .joinRelated("order_rel")
                .where("order_rel.id", order)
                .andWhere("order_rel.user", user)
                .first("check.*")
                .then(check => res.json(check))
                .catch(err => res.json(err.message))
        }
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