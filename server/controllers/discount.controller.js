const Action = require('../models/Action')
const ActionType = require('../models/ActionType')
const Promocode = require('../models/Promocode')
const SubCategoryAction = require('../models/SubCategoryAction')
const HolidayAction = require('../models/HolidayAction')
const DoubleAction = require('../models/DoubleAction')
const BrandAction = require('../models/BrandAction')

class discountController {

    // --------- action CRUD ----------
    async createAction(req, res) {
        const { name, date_begin, date_end, percent, image, action_type } = req.body
        await Action.query()
            .insert({ name, date_begin, date_end, percent, image, action_type })
            .then(action => res.json(action))
            .catch(err => res.json(err.message))
    }

    async updateAction(req, res) {
        const id = req.params.id
        const { name, date_begin, date_end, percent, image, action_type } = req.body
        await Action.query()
            .patchAndFetchById(id, {
                name, date_begin, date_end, percent, image, action_type
            })
            .then(action => {
                if (action === null) res.json("Такой акции нет")
                else res.json(action)
            })
            .catch(err => res.json(err.message))
    }

    async deleteAction(req, res) {
        const id = req.params.id
        await Action.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой акции нет")
                else res.json(`Акция с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getActions(req, res) {
        await Action.query()
            .then(action => res.json(action))
            .catch(err => res.json(err.message))
    }

    async getActionById(req, res) {
        const id = req.params.id
        await Action.query()
            .findById(id)
            .then(action => res.json(action))
            .catch(err => res.json(err.message))
    }

    async getActionsByActionType(req, res) {
        const action_type = req.params.id
        await Action.query()
            .select("*")
            .where("action_type", "=", action_type)
            .then(action => res.json(action))
            .catch(err => res.json(err.message))
    }

    async getLastAction(req, res) {
        await Action.query()
            .orderBy('id', 'desc')
            .first("*")
            .then(action => res.json(action))
            .catch(err => res.json(err.message))
    }

    async getActionInfoById(req, res) {
        const id = req.params.id
        let actionInfo = {}
        await Action.query()
            .findById(id)
            .then(async action => {
                actionInfo.action = action
                let actionType = Number(action.action_type)
                switch (actionType) {
                    case 1:
                        await SubCategoryAction.query()
                            .first("*")
                            .where('action', id)
                            .then(info => {
                                actionInfo.info = info
                                res.json(actionInfo)
                            })
                        break
                    case 2:
                        await HolidayAction.query()
                            .select("*")
                            .where('action', id)
                            .then(info => {
                                actionInfo.info = info
                                res.json(actionInfo)
                            })
                        break
                    case 3:
                        await BrandAction.query()
                            .first("*")
                            .where('action', id)
                            .then(info => {
                                actionInfo.info = info
                                res.json(actionInfo)
                            })
                        break
                    case 4:
                        await DoubleAction.query()
                            .first("*")
                            .where('action', id)
                            .then(info => {
                                actionInfo.info = info
                                res.json(actionInfo)
                            })
                        break
                    default:
                        res.json({})
                        break
                }
            }).catch(err => res.json(err.message))
    }

    // --------- action type CRUD ----------
    async createActionType(req, res) {
        const { name } = req.body
        await ActionType.query()
            .insert({ name })
            .then(actionType => res.json(actionType))
            .catch(err => res.json(err.message))
    }

    async deleteActionType(req, res) {
        const id = req.params.id
        await ActionType.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого типа акций нет")
                else res.json(`Тип акций с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getActionTypes(req, res) {
        await ActionType.query()
            .then(actionType => res.json(actionType))
            .catch(err => res.json(err.message))
    }

    async getActionTypesById(req, res) {
        const id = req.params.id
        await ActionType.query()
            .findById(id)
            .then(actionType => res.json(actionType))
            .catch(err => res.json(err.message))
    }

    // --------- promocode CRUD ----------
    async createPromocode(req, res) {
        const { text, percent, is_active } = req.body
        await Promocode.query()
            .insert({ text, percent, is_active })
            .then(promocode => res.json(promocode))
            .catch(err => res.json(err.message))
    }

    async deletePromocode(req, res) {
        const id = req.params.id
        await Promocode.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого промокода нет")
                else res.json(`Промокод с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async updatePromocode(req, res) {
        const id = req.params.id
        const { text, percent, is_active } = req.body
        await Promocode.query()
            .patchAndFetchById(id, {
                text, percent, is_active
            })
            .then(promocode => {
                if (promocode === null) res.json("Такого промокода нет")
                else res.json(promocode)
            })
            .catch(err => res.json(err.message))
    }

    async getPromocodes(req, res) {
        await Promocode.query()
            .then(promocode => res.json(promocode))
            .catch(err => res.json(err.message))
    }

    async getPromocodeByText(req, res) { //post method
        const { text } = req.body
        await Promocode.query()
            .select("*")
            .where("text", "=", text)
            .then(promocode => res.json(promocode))
            .catch(err => res.json(err.message))
    }

    // --------- sub category action CRUD ----------
    async createSubCategoryAction(req, res) {
        const { action, sub_category } = req.body
        await SubCategoryAction.query()
            .insert({ action, sub_category })
            .then(subCategoryAction => res.json(subCategoryAction))
            .catch(err => res.json(err.message))
    }

    async updateSubCategoryAction(req, res) {
        const id = req.params.id
        const { action, sub_category } = req.body
        await SubCategoryAction.query()
            .patchAndFetchById(id, {
                action, sub_category
            })
            .then(subCategoryAction => {
                if (subCategoryAction === null) res.json("Такой акции подкатегории нет")
                else res.json(subCategoryAction)
            })
            .catch(err => res.json(err.message))
    }

    async deleteSubCategoryAction(req, res) {
        const id = req.params.id
        await SubCategoryAction.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой акции подкатегории нет")
                else res.json(`Акция подкатегории с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getSubCategoryActions(req, res) {
        await SubCategoryAction.query()
            .then(subCategoryAction => res.json(subCategoryAction))
            .catch(err => res.json(err.message))
    }

    async getSubCategoryActionByAction(req, res) {
        const action = req.params.id
        await SubCategoryAction.query()
            .select("*")
            .where("action", "=", action)
            .then(subCategoryAction => res.json(subCategoryAction))
            .catch(err => res.json(err.message))
    }

    // --------- holiday action CRUD ----------
    async createHolidayAction(req, res) {
        const { action, sub_category } = req.body
        await HolidayAction.query()
            .insert({ action, sub_category })
            .then(holidayAction => res.json(holidayAction))
            .catch(err => res.json(err.message))
    }

    async updateHolidayAction(req, res) {
        const id = req.params.id
        const { action, sub_category } = req.body
        await HolidayAction.query()
            .patchAndFetchById(id, {
                action, sub_category
            })
            .then(holidayAction => {
                if (holidayAction === null) res.json("Такой праздничной акции нет")
                else res.json(holidayAction)
            })
            .catch(err => res.json(err.message))
    }

    async deleteHolidayAction(req, res) {
        const id = req.params.id
        await HolidayAction.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой праздничной акции нет")
                else res.json(`Праздничная акция с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getHolidayActions(req, res) {
        await HolidayAction.query()
            .then(holidayAction => res.json(holidayAction))
            .catch(err => res.json(err.message))
    }

    async getHolidayActionById(req, res) {
        const id = req.params.id
        await HolidayAction.query()
            .findById(id)
            .then(holidayAction => res.json(holidayAction))
            .catch(err => res.json(err.message))
    }

    // --------- double action CRUD ----------
    async createDoubleAction(req, res) {
        const { action, full_price_product, discount_product } = req.body
        await DoubleAction.query()
            .insert({ action, full_price_product, discount_product })
            .then(doubleAction => res.json(doubleAction))
            .catch(err => res.json(err.message))
    }

    async updateDoubleAction(req, res) {
        const id = req.params.id
        const { action, full_price_product, discount_product } = req.body
        await DoubleAction.query()
            .patchAndFetchById(id, {
                action, full_price_product, discount_product
            })
            .then(doubleAction => {
                if (doubleAction === null) res.json("Такой акции 1 + 1 нет")
                else res.json(doubleAction)
            })
            .catch(err => res.json(err.message))
    }

    async deleteDoubleAction(req, res) {
        const id = req.params.id
        await DoubleAction.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой акции 1 + 1 нет")
                else res.json(`Акция 1 + 1 с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getDoubleActions(req, res) {
        await DoubleAction.query()
            .then(doubleAction => res.json(doubleAction))
            .catch(err => res.json(err.message))
    }

    async getDoubleActionByAction(req, res) {
        const action = req.params.id
        await DoubleAction.query()
            .select("*")
            .where("action", "=", action)
            .then(doubleAction => res.json(doubleAction))
            .catch(err => res.json(err.message))
    }

    // --------- brand action CRUD ----------
    async createBrandAction(req, res) {
        const { action, manufacturer } = req.body
        await BrandAction.query()
            .insert({ action, manufacturer })
            .then(brandAction => res.json(brandAction))
            .catch(err => res.json(err.message))
    }

    async updateBrandAction(req, res) {
        const id = req.params.id
        const { action, manufacturer } = req.body
        await BrandAction.query()
            .patchAndFetchById(id, {
                action, manufacturer
            })
            .then(brandAction => {
                if (brandAction === null) res.json("Такой акции производителя нет")
                else res.json(brandAction)
            })
            .catch(err => res.json(err.message))
    }

    async deleteBrandAction(req, res) {
        const id = req.params.id
        await BrandAction.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой акции производителя нет")
                else res.json(`Акция производителя с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getBrandActions(req, res) {
        await BrandAction.query()
            .then(brandAction => res.json(brandAction))
            .catch(err => res.json(err.message))
    }

    async getBrandActionByAction(req, res) {
        const action = req.params.id
        await BrandAction.query()
            .select("*")
            .where("action", "=", action)
            .then(brandAction => res.json(brandAction))
            .catch(err => res.json(err.message))
    }
}

module.exports = new discountController()