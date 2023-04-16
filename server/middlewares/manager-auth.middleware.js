const tokenService = require('../service/token.service')

const ADMIN_ROLE = 1;
const MANAGER_ROLE = 2;
const CONTENT_ROLE = 3;
const USER_ROLE = 4;

module.exports = async function (req, res, next) {
    const message = "Доступ разрешён только менеджерам сайта"
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
        if(userData.role !== ADMIN_ROLE || userData.role !== MANAGER_ROLE){
            req.message = message
        }
        req.userData = userData //кладет поле в req, если не авторизован, то поле не появится
        next()
    } catch (err) {
        req.message = err.message
        //next(err)
    }
}