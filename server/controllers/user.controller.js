//temp crud for stuff
const User = require('../models/User')

class userController {
    async saveUser(req, res) {
        const {username, surname, lastname} = req.body
        await User.query()
        .insert({username, surname, lastname})
        .then(user => res.json(user))
        .catch(err => res.json(err)) 
    }

    async getUsers(req, res){
        await User.query()
        .then(users => res.json(users))
        .catch(err => res.json(err)) 
    }

    async getUserById(req, res){
        const id = req.params.id
        await User.query()
        .findById(id)
        .then(user => {
            if(user === undefined) res.json("Такого пользователя нет")
            else res.json(user)
        })
        .catch(err => res.json(err))
    }

    async updateUserById(req, res){
        const {username, surname, lastname} = req.body
        const id = req.params.id
        await User.query()
        .patchAndFetchById(id, {
            username, surname, lastname
        })
        .then(user => {
            if(user === undefined) res.json("Такого пользователя нет")
            else res.json(user)
        })
        .catch(err => res.json(err))
    }

    async deleteUser(req, res) {
        const id = req.params.id
        //если такого айди нет, то не вылетает, но и не рассказывает (дополнить)
        await User.query()
        .deleteById(id)
        .then(res.json(`Пользователь с id = ${id} удален`))
        .catch(err => res.json(err))
    }
}

module.exports = new userController()