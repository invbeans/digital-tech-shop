const tokenService = require('../service/token.service')

module.exports = async function (req, res, next) {
    const authError = new Error("Доступ разрешён только администраторам")
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            throw authError
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            throw authError
        }
        const userData = await tokenService.validateAccessToken(accessToken)
        if (!userData) {
            throw authError
        }
        if(userData.role !== 1){
            throw authError
        }
        req.user = userData //кладет поле в req, если не авторизован, то поле не появится
        next()
    } catch (err) {
        res.status(401).json(err.message)
    }
}