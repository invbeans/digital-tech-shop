const User = require('../models/User')
const MetaUser = require('../models/MetaUser')
const UserProfile = require('../models/UserProfile')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const tokenService = require('../service/token.service')
const UserDto = require('../models/UserDto')
const { transaction } = require('objection')

class userController {
    async saveUser(req, res) {
        const { username, surname, lastname } = req.body
        await User.query()
            .insert({ username, surname, lastname })
            .then(user => res.json(user))
            .catch(err => res.json(err.message))
    }

    async getUsers(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            await User.query()
                .joinRelated('user_profile_rel')
                .joinRelated('meta_user_rel.role_rel')
                .select("user.id", "username", "surname", "firstname", "lastname", "phone_number", "email", "meta_user_rel:role_rel.id as roleId", "name as role")
                .then(users => {
                    res.json(users)
                })
                .catch(err => res.json(err.message))
        }
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
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const id = req.params.id
            await User.query()
                .deleteById(id)
                .then(amount => {
                    if (amount == 0) res.json("Такого пользователя нет")
                    else res.json(`Пользователь с id = ${id} удален`)
                })
                .catch(err => res.json(err.message))
        }
    }

    async registration(req, res) {
        const { firstname, points, username, surname, lastname, email, phone_number, birthday_date, password } = req.body
        await MetaUser.query()
            .select("*")
            .where("email", "=", email)
            .then(async candidate => {
                if (candidate.length > 0) {
                    throw new Error(`Пользователь с почтой: ${email} уже существует`)
                }
                let hashed_password = await bcrypt.hash(password, 3)
                let userId = 0
                let role = 4
                const transac = await transaction(User, MetaUser, UserProfile, async (User, MetaUser, UserProfile) => {
                    await User.query()
                        .insert({ username, surname, lastname })
                        .then(user => userId = user.id)
                    await MetaUser.query()
                        .insert({ user: userId, role, phone_number, hashed_password, birthday_date, email })
                        .then(user => { })
                    await UserProfile.query()
                        .insert({ user: userId, firstname, points })
                        .then(user => { })
                }).then(async () => {
                    const userDto = new UserDto(userId, email, role) //payload
                    const tokens = tokenService.generateToken({ ...userDto })
                    await tokenService.saveToken(userId, tokens.refreshToken)
                    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 40 * 24 * 60 * 60 * 1000, httpOnly: true })
                    res.json({ ...tokens, userDto })
                })
            })
            .catch(err => res.json(err.message))
    }

    async login(req, res) {
        const { email, password } = req.body
        await MetaUser.query()
            .select("*")
            .where("email", "=", email)
            .then(async candidate => {
                if (candidate.length == 0) {
                    throw new Error(`Пользователя с почтой: ${email} не существует`)
                }
                const passwordEquals = await bcrypt.compare(password, candidate[0].hashed_password)
                if (passwordEquals == false) {
                    throw new Error('Пароль указан неверно')
                }
                const userDto = new UserDto(candidate[0].user, email, candidate[0].role) //payload
                const tokens = tokenService.generateToken({ ...userDto })
                await tokenService.saveToken(candidate[0].user, tokens.refreshToken)
                res.cookie('refreshToken', tokens.refreshToken, { maxAge: 40 * 24 * 60 * 60 * 1000, httpOnly: true })
                res.json({ ...tokens, userDto })

            }).catch(err => res.json(err.message))
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies
            await tokenService.removeToken(refreshToken).then(token => {
                res.clearCookie('refreshToken')
                res.json({ token: token[0] })
            })
        } catch (err) {
            res.json(err.message)
        }

    }

    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies
            if (!refreshToken) {
                throw new Error('Вы не авторизованы')
            }
            const userData = await tokenService.validateRefreshToken(refreshToken)
            const foundToken = await tokenService.findToken(refreshToken)
            if (!userData || !foundToken) {
                throw new Error('Вы не авторизованы')
            }
            await MetaUser.query()
                .select("*")
                .where("user", "=", userData.id)
                .then(async candidate => {
                    const userDto = new UserDto(candidate[0].user, candidate[0].email, candidate[0].role) //payload
                    const tokens = tokenService.generateToken({ ...userDto })
                    await tokenService.saveToken(candidate[0].user, tokens.refreshToken)
                    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 40 * 24 * 60 * 60 * 1000, httpOnly: true })
                    res.json({ ...tokens, userDto })
                })
        } catch (err) {
            res.json(err.message)
        }
    }

    async changeUserRole(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const { role } = req.body
            const id = req.params.id
            await MetaUser.query()
                .patchAndFetchById(id, {
                    'role': role
                })
                .then(metaUser => {
                    console.log(metaUser)
                    if (metaUser === undefined) res.json("Такой записи мета_юзер нет")
                    else res.json(metaUser)
                })
                .catch(err => res.json(err.message))
        }
    }

    async findUserBySurname(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const { surname } = req.body
            await User.query()
                .joinRelated('user_profile_rel')
                .joinRelated('meta_user_rel.role_rel')
                .select("user.id", "username", "surname", "firstname", "lastname", "phone_number", "email", "meta_user_rel:role_rel.id as roleId", "name as role")
                .where("surname", "ilike", surname)
                .then(user => res.json(user))
                .catch(err => res.json(err.message))
        }
    }

    async getRoles(req, res) {
        await Role.query()
            .select("*")
            .then(roles => res.json(roles))
            .catch(err => res.json(err.message))
    }
}

module.exports = new userController()