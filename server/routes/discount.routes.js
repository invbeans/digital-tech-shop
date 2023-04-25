const Router = require('express')
const router = new Router()
const controller = require('../controllers/discount.controller')
const contentMiddleware = require('../middlewares/content-auth.middleware')

// --------- action CRUD ----------
router.post('/action', controller.createAction)
router.put('/action/:id', controller.updateAction)
router.delete('/action/:id', controller.deleteAction)
router.get('/action/by_type/:id', controller.getActionsByActionType)
router.get('/action/last', controller.getLastAction)
router.get('/action/:id', controller.getActionById)
router.get('/action_info/:id', controller.getActionInfoById)
router.get('/action', controller.getActions)

// --------- action type CRUD ----------
router.post('/action_type', controller.createActionType)
router.delete('/action_type/:id', controller.deleteActionType)
router.get('/action_type/:id', controller.getActionTypesById)
router.get('/action_type', controller.getActionTypes)

// --------- promocode CRUD ----------
router.post('/promocode/get_by_text', controller.getPromocodeByText)
router.post('/promocode', contentMiddleware, controller.createPromocode)
router.delete('/promocode/:id', controller.deletePromocode)
router.put('/promocode/:id', controller.updatePromocode)
router.get('/promocode', controller.getPromocodes)

// --------- sub category action CRUD ----------
router.post('/sub_category_action', controller.createSubCategoryAction)
router.put('/sub_category_action/:id', controller.updateSubCategoryAction)
router.delete('/sub_category_action/:id', controller.deleteSubCategoryAction)
router.get('/sub_category_action/by_action/:id', controller.getSubCategoryActionByAction)
router.get('/sub_category_action', controller.getSubCategoryActions)

// --------- holiday action CRUD ----------
router.post('/holiday_action', controller.createHolidayAction)
router.put('/holiday_action/:id', controller.updateHolidayAction)
router.delete('/holiday_action/:id', controller.deleteHolidayAction)
router.get('/holiday_action/by_action/:id', controller.getHolidayActionById)
router.get('/holiday_action', controller.getHolidayActions)

// --------- double action CRUD ----------
router.post('/double_action', controller.createDoubleAction)
router.put('/double_action/:id', controller.updateDoubleAction)
router.delete('/double_action/:id', controller.deleteDoubleAction)
router.get('/double_action/by_action/:id', controller.getDoubleActionByAction)
router.get('/double_action', controller.getDoubleActions)

// --------- brand action CRUD ----------
router.post('/brand_action', controller.createBrandAction)
router.put('/brand_action/:id', controller.updateBrandAction)
router.delete('/brand_action/:id', controller.deleteBrandAction)
router.get('/brand_action/by_action/:id', controller.getBrandActionByAction)
router.get('/brand_action', controller.getBrandActions)

module.exports = router