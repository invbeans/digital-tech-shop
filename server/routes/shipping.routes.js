const Router = require('express')
const router = new Router()
const controller = require('../controllers/shipping.controller')
const userMiddleware = require('../middlewares/user-auth.middleware')

//---------- orders part ------------------
router.post('/make_order', userMiddleware, controller.makeOrder)

// --------- shipping service CRUD ----------
router.post('/shipping_service', controller.createShippingService)
router.put('/shipping_service/:id', controller.updateShippingService)
router.delete('/shipping_service/:id', controller.deleteShippingService)
router.get('/shipping_service/by_method/:id', controller.getShippingServiceByShippingMethod)
router.get('/shipping_service/:id', controller.getShippingServiceById)
router.get('/shipping_service', controller.getShippingServices)

// --------- shipping method CRUD ----------
router.post('/shipping_method', controller.createShippingMethod)
router.put('/shipping_method/:id', controller.updateShippingMethod)
router.delete('/shipping_method/:id', controller.deleteShippingMethod)
router.get('/shipping_method/:id', controller.getShippingMethodById)
router.get('/shipping_method', controller.getShippingMethods)

// --------- pickup point type CRUD ----------
router.post('/pickup_point_type', controller.createPickupPointType)
router.put('/pickup_point_type/:id', controller.updatePickupPointType)
router.delete('/pickup_point_type/:id', controller.deletePickupPointType)
router.get('/pickup_point_type/:id', controller.getPickupPointTypeById)
router.get('/pickup_point_type', controller.getPickupPointTypes)

// --------- adress CRUD ----------
router.post('/adress', controller.createAdress)
router.put('/adress/:id', controller.updateAdress)
router.delete('/adress/:id', controller.deleteAdress)
router.get('/adress/:id', controller.getAdressById)

// --------- region CRUD ----------
router.post('/region', controller.createRegion)
router.put('/region/:id', controller.updateRegion)
router.delete('/region/:id', controller.deleteRegion)
router.get('/region/:id', controller.getRegionById)
router.get('/region', controller.getRegions)

// --------- city CRUD ----------
router.post('/city', controller.createCity)
router.put('/city/:id', controller.updateCity)
router.delete('/city/:id', controller.deleteCity)
router.get('/city/by_region/:id', controller.getCityByRegion)
router.get('/city/:id', controller.getCityById)
router.get('/city', controller.getCities)

// --------- street CRUD ----------
router.post('/street/by_district_and_city', controller.getStreetByDistrictAndCity)
router.post('/street', controller.createStreet)
router.put('/street/:id', controller.updateStreet)
router.delete('/street/:id', controller.deleteStreet)
router.get('/street/:id', controller.getStreetById)
router.get('/street', controller.getStreets)

// --------- district CRUD ----------
router.post('/district', controller.createDistrict)
router.put('/district/:id', controller.updateDistrict)
router.delete('/district/:id', controller.deleteDistrict)
router.get('/district/by_city/:id', controller.getDistrictByCity)
router.get('/district/:id', controller.getDistrictById)
router.get('/district', controller.getDistricts)

// --------- district city CRUD ----------
router.post('/district_city', controller.createDistrictCity)
router.put('/district_city/:id', controller.updateDistrictCity)
router.delete('/district_city/:id', controller.deleteDistrictCity)
router.get('/district_city/by_city/:id', controller.getDistrictCityByCity)
router.get('/district_city/:id', controller.getDistrictCityById)
router.get('/district_city', controller.getDistrictCities)

// --------- district street CRUD ----------
router.post('/district_street', controller.createDistrictStreet)
router.put('/district_street/:id', controller.updateDistrictStreet)
router.delete('/district_street/:id', controller.deleteDistrictStreet)
router.get('/district_street/by_district_city/:id', controller.getDistrictStreetByDistrictCity)
router.get('/district_street/:id', controller.getDistrictStreetById)
router.get('/district_street', controller.getDistrictCities)

// ---------  street type CRUD ----------
router.post('/street_type', controller.createStreetType)
router.delete('/street_type/:id', controller.deleteStreetType)
router.get('/street_type', controller.getStreetTypes)

// ---------  order shipping CRUD ----------
router.post('/order_shipping', controller.createOrderShipping)
router.put('/order_shipping/:id', controller.updateOrderShipping)
router.delete('/order_shipping/:id', controller.deleteOrderShipping)
router.get('/order_shipping/by_order/:id', controller.getOrderShippingByOrder)

// --------- shipping history CRUD ----------
router.post('/shipping_history', controller.createShippingHistory)
router.delete('/shipping_history/:id', controller.deleteShippingHistory)
router.get('/shipping_history/by_shipping_status/:id', controller.getShippingHistoryByShippingStatus)
router.get('/shipping_history/by_order/:id', controller.getShippingHistoryByOrder)
router.get('/shipping_history', controller.getShippingHistories)

// --------- shipping status CRUD ----------
router.post('/shipping_status', controller.createShippingStatus)
router.delete('/shipping_status/:id', controller.deleteShippingStatus)
router.get('/shipping_status', controller.getShippingStatuses)

module.exports = router