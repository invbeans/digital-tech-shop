const tokenService = require('../service/token.service')

module.exports = async function (req, res, next) {
    const message = "Доступ разрешён только администраторам"
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            req.message = message
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            req.message = message
        }
        const userData = await tokenService.validateAccessToken(accessToken)
        if (!userData) {
            req.message = message
        }
        if(userData.role !== 1){
            req.message = message
        }
        req.user = userData //кладет поле в req, если не авторизован, то поле не появится
        next()
    } catch (err) {
        req.message = err.message
        //next(err)
    }
}