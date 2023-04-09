const User = require('../models/User')
const MetaUser = require('../models/MetaUser')
const UserProfile = require('../models/UserProfile')
const bcrypt = require('bcrypt')

class userController {
    async saveUser(req, res) {
        const { username, surname, lastname } = req.body
        await User.query()
            .insert({ username, surname, lastname })
            .then(user => res.json(user))
            .catch(err => res.json(err.message))
    }

    async getUsers(req, res) {
        await User.query()
            .then(users => res.json(users))
            .catch(err => res.json(err.message))
    }

    async getUserById(req, res) {
        const id = req.params.id
        await User.query()
            .findById(id)
            .then(user => {
                if (user === undefined) res.json("Такого пользователя нет")
                else res.json(user)
            })
            .catch(err => res.json(err.message))
    }

    async updateUserById(req, res) {
        const { username, surname, lastname } = req.body
        const id = req.params.id
        await User.query()
            .patchAndFetchById(id, {
                username, surname, lastname
            })
            .then(user => {
                if (user === undefined) res.json("Такого пользователя нет")
                else res.json(user)
            })
            .catch(err => res.json(err.message))
    }

    async deleteUser(req, res) {
        const id = req.params.id
        await User.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого пользователя нет")
                else res.json(`Пользователь с id = ${id} удален`)
            })
            .catch(err => res.json(err.message))
    }

    async registration(req, res) {
        const { firstname, points, username, surname, lastname, email, phone_number, birthday_date, password } = req.body
        await MetaUser.query()
            .select("*")
            .where("email", "=", email)
            .then(async candidate => {
                if (candidate.length > 0) {
                    res.json(`Пользователь с почтой: ${email} уже существует`)
                }
                let hashed_password = await bcrypt.hash(password, 3)
                let id = 0
                await User.query()
                    .insert({ username, surname, lastname })
                    .then(user => id = user.id)
                    .catch(err => res.json(err.message))
                let user = id
                let role = 4
                await MetaUser.query()
                    .insert({ user, role, phone_number, hashed_password, birthday_date, email })
                    .then(user => { })
                await UserProfile.query()
                    .insert({ user, firstname, points })
                    .then(user => { })
                res.json("Успешная регистрация!")
            })
            .catch(err => res.json(err.message))
    }

    async login(req, res) {

    }

    async logout(req, res) {

    }

    async activate(req, res) {

    }

    async refresh(req, res) {

    }
}

module.exports = new userController()