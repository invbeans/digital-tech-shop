const jwt = require('jsonwebtoken')
const Token = require('../models/Token')

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '40d' })
        return { accessToken, refreshToken }
    }

    async saveToken(userId, refreshToken) {
        await Token.query()
            .select("*")
            .where("user", "=", userId)
            .then(async token => {
                if (token.length > 0) {
                    await Token.query()
                        .patchAndFetchById(userId, { refresh_token: refreshToken })
                        .then(updatedToken => {
                            return updatedToken
                        })
                } else {
                    Token.query()
                        .insert({ user: userId, refresh_token: refreshToken })
                        .then(token => {
                            return token
                        })
                }
            })
    }

    async removeToken(refreshToken) {
        const token = await Token.query()
            .delete()
            .where("refresh_token", "=", refreshToken)
            .returning("*")
        return token
    }

    async validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (err) {
            return null
        }
    }

    async validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (err) {
            return null
        }
    }

    async findToken(refreshToken) {
        const token = await Token.query()
            .where("refresh_token", "=", refreshToken)
            .returning("*")
        return token
    }
}

module.exports = new TokenService()