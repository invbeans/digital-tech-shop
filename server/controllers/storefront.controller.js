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
const { raw } = require('objection')

class storefrontController {
    //проверки на роль админа / контент манагёра пока нет

    // --------- main category CRUD ----------
    async createMainCategory(req, res) {
        const { name } = req.body
        await MainCategory.query()
            .insert({ name })
            .then(mainCategory => res.json(mainCategory))
            .catch(err => res.json(err.message))
    }

    async updateMainCategory(req, res) {
        const id = req.params.id
        const { name } = req.body
        await MainCategory.query()
            .patchAndFetchById(id, {
                name
            })
            .then(mainCategory => {
                if (mainCategory === null) res.json("Такой категории нет")
                else res.json(mainCategory)
            })
            .catch(err => res.json(err.message))
    }

    async deleteMainCategory(req, res) {
        const id = req.params.id
        await MainCategory.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой категории нет")
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
    async createSubCategory(req, res) {
        const { main_category, name } = req.body
        //без проверки потому что интерфейс только
        //через категорию добавляет
        await SubCategory.query()
            .insert({ main_category, name })
            .then(subCategory => res.json(subCategory))
            .catch(err => res.json(err.message))
    }

    async updateSubCategory(req, res) {
        const id = req.params.id
        const { main_category, name } = req.body
        await SubCategory.query()
            .patchAndFetchById(id, {
                main_category, name
            })
            .then(subCategory => {
                if (subCategory === null) res.json("Такой подкатегории нет")
                else res.json(subCategory)
            })
            .catch(err => res.json(err.message))
    }

    async deleteSubCategory(req, res) {
        const id = req.params.id
        await SubCategory.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой подкатегории нет")
                else res.json(`Подкатегория с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getSubCategories(req, res) {
        await SubCategory.query()
            .then(subCategories => res.json(subCategories))
            .catch(err => res.json(err))
    }

    // --------- product CRUD and more ----------
    async createProduct(req, res) {
        const { name, sub_category, price, manufacturer, supplier } = req.body
        await Product.query()
            .insert({ name, sub_category, price, manufacturer, supplier })
            .then(product => res.json(product))
            .catch(err => res.json(err.message))
    }

    async updateProduct(req, res) {
        const id = req.params.id
        const { name, sub_category, price, manufacturer, supplier } = req.body
        await Product.query()
            .patchAndFetchById(id, {
                name, sub_category, price, manufacturer, supplier
            })
            .then(product => {
                if (product === null) res.json("Такого товара нет")
                else res.json(product)
            })
            .catch(err => res.json(err.message))
    }

    async deleteProduct(req, res) {
        const id = req.params.id
        await Product.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого товара нет")
                else res.json(`Товар с id = ${id} удалён`)
            })
            .catch(err => res.json(err.message))
    }

    async getProducts(req, res) {
        await Product.query()
            .then(product => res.json(product))
            .catch(err => res.json(err))
    }

    async getProductById(req, res) {
        const id = req.params.id
        await Product.query()
            .findById(id)
            .then(product => {
                if (product === null) res.json("Такого товара нет")
                else res.json(product)
            })
            .catch(err => res.json(err.message))
    }

    async getFilteredProducts(req, res) {
        const { properties, price, brands } = req.body

        //example of json:
        /*
        {
    "properties": [
        {"name": "memory",
        "values": ["12", "13", "14"]},
        {"name": "screen",
        "values": ["shmol", "mid", "invisible", "why"]}
    ]
}
         */


        let propertyStr = ""
        if (properties !== undefined) {
            properties.map(elem => {
                propertyStr += `'${elem.name}' in (`
                elem.values.map(val => {
                    propertyStr += `'${val}',`
                })
                propertyStr = propertyStr.slice(0, -1)
                propertyStr += ') '
            })
        }
        //"'memory' in ('12','13','14') 'screen' in ('shmol','mid','invisible','why') "
        let brandStr = "manufacturer in ("
        if (brands !== undefined) {
            brands.map(elem => {
                brandStr += `'${elem}',`
            })
        }
        brandStr = brandStr.slice(0, -1)
        brandStr += ') '
        //"manufacturer in ('aboba','megaABOBA') "
        //omg how to ask properties tables for all of these...
        //res.json(propertyStr)
        res.json(brandStr)
        //await Product.query()
        //.where(raw())
    }
}

module.exports = new storefrontController()