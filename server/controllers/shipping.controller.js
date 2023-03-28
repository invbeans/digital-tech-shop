const ShippingService = require('../models/ShippingService')
const ShippingMethod = require('../models/ShippingMethod')
const PickupPointType = require('../models/PickupPointType')
const Adress = require('../models/Adress')
const Region = require('../models/Region')
const City = require('../models/City')
const Street = require('../models/Street')
const District = require('../models/District')
const DistrictCity = require('../models/DistrictCity')
const DistrictStreet = require('../models/DistrictStreet')
const StreetType = require('../models/StreetType')
const OrderShipping = require('../models/OrderShipping')
const ShippingHistory = require('../models/ShippingHistory')
const ShippingStatus = require('../models/ShippingStatus')

class shippingController {
    //здесь тоже нужно будет проверять роль пользователя (тут все на админе и история на менеджере)

    // --------- shipping service CRUD ----------
    async createShippingService(req, res) {
        const { name, shipping_method, price } = req.body
        await ShippingService.query()
            .insert({ name, shipping_method, price })
            .then(shippingService => res.json(shippingService))
            .catch(err => res.json(err.message))
    }

    async updateShippingService(req, res) {
        const id = req.params.id
        const { name, shipping_method, price } = req.body
        await ShippingService.query()
            .patchAndFetchById(id, {
                name, shipping_method, price
            })
            .then(shippingService => {
                if (shippingService === null) res.json("Такого сервиса доставки нет")
                else res.json(shippingService)
            })
            .catch(err => res.json(err.message))
    }

    async deleteShippingService(req, res) {
        const id = req.params.id
        await ShippingService.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого сервиса доставки нет")
                else res.json(`Сервис доставки с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getShippingServices(req, res) {
        await ShippingService.query()
            .then(shippingService => res.json(shippingService))
            .catch(err => res.json(err.message))
    }

    async getShippingServiceById(req, res) {
        const id = req.params.id
        await ShippingService.query()
            .findById(id)
            .then(shippingService => res.json(shippingService))
            .catch(err => res.json(err.message))
    }

    // --------- shipping method CRUD ----------
    async createShippingMethod(req, res) {
        const { name, shipping_time } = req.body
        await ShippingMethod.query()
            .insert({ name, shipping_time })
            .then(shippingMethod => res.json(shippingMethod))
            .catch(err => res.json(err.message))
    }

    async updateShippingMethod(req, res) {
        const id = req.params.id
        const { name, shipping_time } = req.body
        await ShippingMethod.query()
            .patchAndFetchById(id, {
                name, shipping_time
            })
            .then(shippingMethod => {
                if (shippingMethod === null) res.json("Такого способа доставки нет")
                else res.json(shippingMethod)
            })
            .catch(err => res.json(err.message))
    }

    async deleteShippingMethod(req, res) {
        const id = req.params.id
        await ShippingMethod.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого способа доставки нет")
                else res.json(`Способ доставки с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getShippingMethods(req, res) {
        await ShippingMethod.query()
            .then(shippingMethod => res.json(shippingMethod))
            .catch(err => res.json(err.message))
    }

    async getShippingMethodById(req, res) {
        const id = req.params.id
        await ShippingMethod.query()
            .findById(id)
            .then(shippingMethod => res.json(shippingMethod))
            .catch(err => res.json(err.message))
    }

    // --------- pickup point type CRUD ----------
    async createPickupPointType(req, res) {
        const { name, storage_days } = req.body
        await PickupPointType.query()
            .insert({ name, storage_days })
            .then(pickupPointType => res.json(pickupPointType))
            .catch(err => res.json(err.message))
    }

    async updatePickupPointType(req, res) {
        const id = req.params.id
        const { name, storage_days } = req.body
        await PickupPointType.query()
            .patchAndFetchById(id, {
                name, storage_days
            })
            .then(pickupPointType => {
                if (pickupPointType === null) res.json("Такого типа пункта выдачи нет")
                else res.json(pickupPointType)
            })
            .catch(err => res.json(err.message))
    }

    async deletePickupPointType(req, res) {
        const id = req.params.id
        await PickupPointType.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого типа пункта выдачи нет")
                else res.json(`Тип пункта выдачи с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getPickupPointTypes(req, res) {
        await PickupPointType.query()
            .then(pickupPointType => res.json(pickupPointType))
            .catch(err => res.json(err.message))
    }

    async getPickupPointTypeById(req, res) {
        const id = req.params.id
        await PickupPointType.query()
            .findById(id)
            .then(pickupPointType => res.json(pickupPointType))
            .catch(err => res.json(err.message))
    }

    // --------- adress CRUD ----------
    async createAdress(req, res) {
        const { order_adress, street_type, house, building, apartment, postcode } = req.body
        await Adress.query()
            .insert({ order_adress, street_type, house, building, apartment, postcode })
            .then(adress => res.json(adress))
            .catch(err => res.json(err.message))
    }

    async updateAdress(req, res) {
        const id = req.params.id
        const { order_adress, street_type, house, building, apartment, postcode } = req.body
        await Adress.query()
            .patchAndFetchById(id, {
                order_adress, street_type, house, building, apartment, postcode
            })
            .then(adress => {
                if (adress === null) res.json("Такого адреса нет")
                else res.json(adress)
            })
            .catch(err => res.json(err.message))
    }

    async deleteAdress(req, res) {
        const id = req.params.id
        await Adress.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого адреса нет")
                else res.json(`Адрес с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getAdressById(req, res) {
        const id = req.params.id
        await Adress.query()
            .findById(id)
            .then(adress => res.json(adress))
            .catch(err => res.json(err.message))
    }

    // --------- region CRUD ----------
    async createRegion(req, res) {
        const { name } = req.body
        await Region.query()
            .insert({ name })
            .then(region => res.json(region))
            .catch(err => res.json(err.message))
    }

    async updateRegion(req, res) {
        const id = req.params.id
        const { name } = req.body
        await Region.query()
            .patchAndFetchById(id, {
                name
            })
            .then(region => {
                if (region === null) res.json("Такого региона нет")
                else res.json(region)
            })
            .catch(err => res.json(err.message))
    }

    async deleteRegion(req, res) {
        const id = req.params.id
        await Region.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого региона нет")
                else res.json(`Регион с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getRegions(req, res) {
        await Region.query()
            .then(region => res.json(region))
            .catch(err => res.json(err.message))
    }

    async getRegionById(req, res) {
        const id = req.params.id
        await Region.query()
            .findById(id)
            .then(region => res.json(region))
            .catch(err => res.json(err.message))
    }

    // --------- city CRUD ----------
    async createCity(req, res) {
        const { region, name } = req.body
        await City.query()
            .insert({ region, name })
            .then(region => res.json(region))
            .catch(err => res.json(err.message))
    }

    async updateCity(req, res) {
        const id = req.params.id
        const { region, name } = req.body
        await City.query()
            .patchAndFetchById(id, {
                region, name
            })
            .then(city => {
                if (city === null) res.json("Такого города нет")
                else res.json(city)
            })
            .catch(err => res.json(err.message))
    }

    async deleteCity(req, res) {
        const id = req.params.id
        await City.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого города нет")
                else res.json(`Город с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getCities(req, res) {
        await City.query()
            .then(city => res.json(city))
            .catch(err => res.json(err.message))
    }

    async getCityById(req, res) {
        const id = req.params.id
        await City.query()
            .findById(id)
            .then(city => res.json(city))
            .catch(err => res.json(err.message))
    }

    async getCityByRegion(req, res) {
        const region = req.params.id
        await City.query()
            .select("*")
            .where("region", "=", region)
            .then(city => res.json(city))
            .catch(err => res.json(err.message))
    }

    // --------- street CRUD ----------
    async createStreet(req, res) {
        const { name } = req.body
        await Street.query()
            .insert({ name })
            .then(street => res.json(street))
            .catch(err => res.json(err.message))
    }

    async updateStreet(req, res) {
        const id = req.params.id
        const { name } = req.body
        await Street.query()
            .patchAndFetchById(id, {
                name
            })
            .then(street => {
                if (street === null) res.json("Такой улицы нет")
                else res.json(street)
            })
            .catch(err => res.json(err.message))
    }

    async deleteStreet(req, res) {
        const id = req.params.id
        await Street.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой улицы нет")
                else res.json(`Улица с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getStreets(req, res) {
        await Street.query()
            .then(street => res.json(street))
            .catch(err => res.json(err.message))
    }

    async getStreetById(req, res) {
        const id = req.params.id
        await Street.query()
            .findById(id)
            .then(street => res.json(street))
            .catch(err => res.json(err.message))
    }

    // --------- district CRUD ----------
    async createDistrict(req, res) {
        const { name } = req.body
        await District.query()
            .insert({ name })
            .then(district => res.json(district))
            .catch(err => res.json(err.message))
    }

    async updateDistrict(req, res) {
        const id = req.params.id
        const { name } = req.body
        await District.query()
            .patchAndFetchById(id, {
                name
            })
            .then(district => {
                if (district === null) res.json("Такого района нет")
                else res.json(district)
            })
            .catch(err => res.json(err.message))
    }

    async deleteDistrict(req, res) {
        const id = req.params.id
        await District.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого района нет")
                else res.json(`Район с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getDistricts(req, res) {
        await District.query()
            .then(district => res.json(district))
            .catch(err => res.json(err.message))
    }

    async getDistrictById(req, res) {
        const id = req.params.id
        await District.query()
            .findById(id)
            .then(district => res.json(district))
            .catch(err => res.json(err.message))
    }

    // --------- district city CRUD ----------
    async createDistrictCity(req, res) {
        const { city, district } = req.body
        await DistrictCity.query()
            .insert({ city, district })
            .then(districtCity => res.json(districtCity))
            .catch(err => res.json(err.message))
    }

    async updateDistrictCity(req, res) {
        const id = req.params.id
        const { city, district } = req.body
        await DistrictCity.query()
            .patchAndFetchById(id, {
                city, district
            })
            .then(districtCity => {
                if (districtCity === null) res.json("Такой записи 'район-город' нет")
                else res.json(districtCity)
            })
            .catch(err => res.json(err.message))
    }

    async deleteDistrictCity(req, res) {
        const id = req.params.id
        await DistrictCity.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой записи 'район-город' нет")
                else res.json(`'Район-город' с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getDistrictCities(req, res) {
        await DistrictCity.query()
            .then(districtCity => res.json(districtCity))
            .catch(err => res.json(err.message))
    }

    async getDistrictCityById(req, res) {
        const id = req.params.id
        await DistrictCity.query()
            .findById(id)
            .then(districtCity => res.json(districtCity))
            .catch(err => res.json(err.message))
    }

    async getDistrictCityByCity(req, res) {
        const city = req.params.id
        await DistrictCity.query()
            .select("*")
            .where("city", "=", city)
            .then(districtCity => res.json(districtCity))
            .catch(err => res.json(err.message))
    }

    // --------- district street CRUD ----------
    async createDistrictStreet(req, res) {
        const { district_city, street } = req.body
        await DistrictStreet.query()
            .insert({ district_city, street })
            .then(districtStreet => res.json(districtStreet))
            .catch(err => res.json(err.message))
    }

    async updateDistrictStreet(req, res) {
        const id = req.params.id
        const { district_city, street } = req.body
        await DistrictStreet.query()
            .patchAndFetchById(id, {
                district_city, street
            })
            .then(districtStreet => {
                if (districtStreet === null) res.json("Такой записи 'район-улица' нет")
                else res.json(districtStreet)
            })
            .catch(err => res.json(err.message))
    }

    async deleteDistrictStreet(req, res) {
        const id = req.params.id
        await DistrictStreet.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой записи 'район-улица' нет")
                else res.json(`'Район-улица' с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getDistrictStreets(req, res) {
        await DistrictStreet.query()
            .then(districtStreet => res.json(districtStreet))
            .catch(err => res.json(err.message))
    }

    async getDistrictStreetById(req, res) {
        const id = req.params.id
        await DistrictStreet.query()
            .findById(id)
            .then(districtStreet => res.json(districtStreet))
            .catch(err => res.json(err.message))
    }

    async getDistrictStreetByDistrictCity(req, res) {
        const district_city = req.params.id
        await DistrictStreet.query()
            .select("*")
            .where("district_city", "=", district_city)
            .then(districtStreet => res.json(districtStreet))
            .catch(err => res.json(err.message))
    }

    // ---------  street type CRUD ----------
    async createStreetType(req, res) {
        const { name } = req.body
        await StreetType.query()
            .insert({ name })
            .then(streetType => res.json(streetType))
            .catch(err => res.json(err.message))
    }

    async deleteStreetType(req, res) {
        const id = req.params.id
        await StreetType.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого типа улицы нет")
                else res.json(`Тип улицы с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getStreetTypes(req, res) {
        await StreetType.query()
            .then(streetType => res.json(streetType))
            .catch(err => res.json(err.message))
    }

    // ---------  order shipping CRUD ----------
    async createOrderShipping(req, res) {
        const { shipping_service, adress, pickup_point_type } = req.body
        await OrderShipping.query()
            .insert({ shipping_service, adress, pickup_point_type })
            .then(orderShipping => res.json(orderShipping))
            .catch(err => res.json(err.message))
    }

    async updateOrderShipping(req, res) {
        const id = req.params.id
        const { shipping_service, adress, pickup_point_type } = req.body
        await OrderShipping.query()
            .patchAndFetchById(id, {
                shipping_service, adress, pickup_point_type
            })
            .then(orderShipping => {
                if (orderShipping === null) res.json("Такой доставки заказа нет")
                else res.json(orderShipping)
            })
            .catch(err => res.json(err.message))
    }

    async deleteOrderShipping(req, res) {
        const id = req.params.id
        await OrderShipping.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой доставки заказа нет")
                else res.json(`Доставка заказа с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getOrderShippingByOrder(req, res) {
        const order = req.params.id
        await OrderShipping.query()
            .select("*")
            .where("order", "=", order)
            .then(orderShipping => res.json(orderShipping))
            .catch(err => res.json(err.message))
    }

    // --------- shipping history CRUD ----------
    async createShippingHistory(req, res) {
        const { order, date, shipping_status } = req.body
        await ShippingHistory.query()
            .insert({ order, date, shipping_status })
            .then(shippingHistory => res.json(shippingHistory))
            .catch(err => res.json(err.message))
    }

    async deleteShippingHistory(req, res) {
        const id = req.params.id
        await ShippingHistory.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой записи отслеживания заказа нет")
                else res.json(`Запись отслеживания заказа с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getShippingHistories(req, res) {
        await ShippingHistory.query()
            .then(shippingHistory => res.json(shippingHistory))
            .catch(err => res.json(err.message))
    }

    async getShippingHistoryByOrder(req, res) {
        const order = req.params.id
        await ShippingHistory.query()
            .select("*")
            .where("order", "=", order)
            .then(shippingHistory => res.json(shippingHistory))
            .catch(err => res.json(err.message))
    }

    async getShippingHistoryByShippingStatus(req, res) {
        const shipping_status = req.params.id
        await ShippingHistory.query()
            .select("*")
            .where("shipping_status", "=", shipping_status)
            .then(shippingHistory => res.json(shippingHistory))
            .catch(err => res.json(err.message))
    }

    // --------- shipping status CRUD ----------
    async createShippingStatus(req, res) {
        const { name } = req.body
        await ShippingStatus.query()
            .insert({ name })
            .then(shippingStatus => res.json(shippingStatus))
            .catch(err => res.json(err.message))
    }

    async deleteShippingStatus(req, res) {
        const id = req.params.id
        await ShippingStatus.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого статуса отправления нет")
                else res.json(`Статус отправления с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getShippingStatuses(req, res) {
        await ShippingStatus.query()
            .then(shippingStatus => res.json(shippingStatus))
            .catch(err => res.json(err.message))
    }
}

module.exports = new shippingController()