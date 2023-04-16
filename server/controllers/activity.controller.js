const Review = require('../models/Review')
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const ReturnApplication = require('../models/ReturnApplication')
const ReturnProduct = require('../models/ReturnProduct')
const User = require('../models/User')

class activityController {
    // --------- review CRUD ----------
    async createReview(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            let { user, product, points, date, text } = req.body
            if(!user){
                user = req.userData.id
            }
            await Review.query()
                .insert({ user, product, points, date, text })
                .then(review => {
                    res.json(review)
                })
                .catch(err => res.json(err.message))
        }
    }

    async updateReview(req, res) {
        const id = req.params.id
        const { user, product, points, date, text } = req.body
        await Review.query()
            .patchAndFetchById(id, {
                user, product, points, date, text
            })
            .then(review => {
                if (review === null) res.json("Такого отзыва нет")
                else res.json(review)
            })
            .catch(err => res.json(err.message))
    }

    async deleteReview(req, res) {
        const id = req.params.id
        await Review.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого отзыва нет")
                else res.json(`Отзыв с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getReviewByProduct(req, res) {
        const product = req.params.id
        let reviewsForProducts = []
        await Review.query()
            .select("*")
            .where("product", "=", product)
            .then(async review => {
                for (const rev of review) {
                    let revForProdElem = {}
                    revForProdElem = { ...rev }
                    await User.query()
                        .findById(rev.user)
                        .then(user => {
                            revForProdElem.user = user.username
                        })
                    reviewsForProducts.push(revForProdElem)
                }
                res.json(reviewsForProducts)
            })
            .catch(err => res.json(err.message))
    }

    // --------- question CRUD ----------
    async createQuestion(req, res) {
        const { user, product, date, text } = req.body
        await Question.query()
            .insert({ user, product, date, text })
            .then(question => res.json(question))
            .catch(err => res.json(err.message))
    }

    async updateQuestion(req, res) {
        const id = req.params.id
        const { user, product, date, text } = req.body
        await Question.query()
            .patchAndFetchById(id, {
                user, product, date, text
            })
            .then(question => {
                if (question === null) res.json("Такого вопроса нет")
                else res.json(question)
            })
            .catch(err => res.json(err.message))
    }

    async deleteQuestion(req, res) {
        const id = req.params.id
        await Question.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого вопроса нет")
                else res.json(`Вопрос с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getQuestionByProduct(req, res) {
        const product = req.params.id
        await Question.query()
            .select("*")
            .where("product", "=", product)
            .then(question => res.json(question))
            .catch(err => res.json(err.message))
    }

    // --------- answer CRUD ----------
    async createAnswer(req, res) {
        const { question, user, date, text } = req.body
        await Answer.query()
            .insert({ question, user, date, text })
            .then(answer => res.json(answer))
            .catch(err => res.json(err.message))
    }

    async updateAnswer(req, res) {
        const id = req.params.id
        const { question, user, date, text } = req.body
        await Answer.query()
            .patchAndFetchById(id, {
                question, user, date, text
            })
            .then(answer => {
                if (answer === null) res.json("Такого ответа нет")
                else res.json(answer)
            })
            .catch(err => res.json(err.message))
    }

    async deleteAnswer(req, res) {
        const id = req.params.id
        await Answer.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого ответа нет")
                else res.json(`Ответ с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getAnswerByQuestion(req, res) {
        const question = req.params.id
        await Answer.query()
            .select("*")
            .where("question", "=", question)
            .then(answer => res.json(answer))
            .catch(err => res.json(err.message))
    }

    // --------- return application CRUD ----------
    async createReturnApplication(req, res) {
        const { date, order, text, approved } = req.body
        await ReturnApplication.query()
            .insert({ date, order, text, approved })
            .then(returnApplication => res.json(returnApplication))
            .catch(err => res.json(err.message))
    }

    async updateReturnApplication(req, res) {
        const id = req.params.id
        const { date, order, text, approved } = req.body
        await ReturnApplication.query()
            .patchAndFetchById(id, {
                date, order, text, approved
            })
            .then(returnApplication => {
                if (returnApplication === null) res.json("Такой заявки на возврат нет")
                else res.json(returnApplication)
            })
            .catch(err => res.json(err.message))
    }

    async deleteReturnApplication(req, res) {
        const id = req.params.id
        await ReturnApplication.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой заявки на возврат нет")
                else res.json(`Заявка на возврат с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getReturnApplications(req, res) {
        await ReturnApplication.query()
            .then(returnApplication => res.json(returnApplication))
            .catch(err => res.json(err.message))
    }

    // --------- return product CRUD ----------
    async createReturnProduct(req, res) {
        const { return_application, product, proper_quality } = req.body
        await ReturnProduct.query()
            .insert({ return_application, product, proper_quality })
            .then(returnProduct => res.json(returnProduct))
            .catch(err => res.json(err.message))
    }

    async deleteReturnProduct(req, res) {
        const id = req.params.id
        await ReturnProduct.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого возвращаемого товара нет")
                else res.json(`Возвращаемый товар с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getReturnProductByReturnApplication(req, res) {
        const return_application = req.params.id
        await ReturnProduct.query()
            .select("*")
            .where("return_application", "=", return_application)
            .then(returnProduct => res.json(returnProduct))
            .catch(err => res.json(err.message))
    }
}

module.exports = new activityController()