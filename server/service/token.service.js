const jwt = require('jsonwebtoken')
const Token = require('../models/Token')

class TokenService {
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '40d'})
        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken) {
        await Token.query()
        .select("*")
        .where("user", "=", userId)
        .then(async token => {
            if(token.length > 0){
                await Token.query()
                .patchAndFetchById(userId, {refreshToken})
                .then(updatedToken => {
                    return updatedToken
                })
            } else {
                Token.query()
                .insert({user: userId, refresh_token: refreshToken})
                .then(token => {
                    return token
                })
            }
        })
    }
}

module.exports = new TokenService()