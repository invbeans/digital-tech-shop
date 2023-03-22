const MainCategory = require("../models/MainCategory")
const SubCategory = require("../models/SubCategory")
const Product = require("../models/Product")
const Property = require("../models/Property")
const PropertyValue = require("../models/PropertyValue")
const PropertySubCategory = require("../models/PropertySubCategory")
const ProductPropertyValues = require("../models/ProductPropertyValues")
const ProductRemains = require("../models/ProductRemains")
const ProductImage = require("../models/ProductImage")
const Supplier = require("../models/Supplier")
const Manufacturer = require("../models/Manufacturer")

class storefrontController {
    //проверки на роль админа / контент манагёра пока нет

    // --------- main category CRUD ----------
    async createMainCategory(req, res) {
        const {name} = req.body
        await MainCategory.query()
        .insert({name})
        .then(mainCategory => res.json(mainCategory))
        .catch(err => res.json(err.message))
    }

    async updateMainCategory(req, res) {
        const id = req.params.id
        const {name} = req.body
        await MainCategory.query()
        .patchAndFetchById(id, {
            name})
        .then(mainCategory => {
            if(mainCategory === null) res.json("Такой категории нет")
            else res.json(mainCategory)
        })
        .catch(err => res.json(err.message))
    }

    async deleteMainCategory(req, res) {
        const id = req.params.id
        await MainCategory.query()
        .deleteById(id)
        .then(amount => {
            if(amount == 0) res.json("Такой категории нет")
            else res.json(`Категория с id = ${id} удалена`)
        })
        .catch(err => res.json(err.message))
    }

    async getMainCategories(req, res) {
        await MainCategory.query()
        .then(mainCategories => res.json(mainCategories))
        .catch(err => res.json(err))
    }

    // --------- sub category CRUD ----------

}

module.exports = new storefrontController()