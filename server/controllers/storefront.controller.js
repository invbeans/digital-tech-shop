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
const {knex} = require('knex')

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

    //хаха а что делать...
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


        /*let propertyStr = ""
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
        await Product.query()
        .findById(await ProductPropertyValues.query()
        .where(raw("property_value in (??)", await PropertyValue.query()
        .where(raw("property in (??)", await Property.query()
        .where(raw("name in (??)", ...)))))))
        .where() //цены и бренд*/

        //let propStr = ""

        /*let props = []
        let propval = []
        let prodpropvalues = []

        for (let i = 0; i < properties.length; i++) {
            await Property.query()
                .where(raw(`name = '${properties[i].name}'`))
                .then(async pr => { //а это же массив
                    for (let i = 0; i < pr.length; i++) {
                        await PropertyValue.query()
                            .where(raw(`property = '${pr[i].id}'`))
                            .then(async prval => {
                                for (let i = 0; i < prval.length; i++) {
                                    await ProductPropertyValues.query()
                                        .where(raw(`property_value = '${prval[i].id}'`))
                                        .then(async prodPropVal => {
                                            await Product.query()
                                            .where(raw())
                                        })
                                        .catch(err => res.json(err.message))
                                }
                            })
                            .catch(err => res.json(err.message))
                    }
                })
                .catch(err => res.json(err.message))
        }
        //res.json(props[1][0].name)
        //res.json(props)
        

        async function getPropValue(props) {
            for (let i = 0; i < props.length; i++) {
                await PropertyValue.query()
                    .where(raw(`property = '${props[i].id}'`))
                    .then(async prval => {
                        propval.push(prval)
                        //await getProdPropValues(prval)
                    })
                    .catch(err => res.json(err.message))
            }
        }

        async function getProdPropValues(propval) {
            for (let i = 0; i < propval.length; i++) {
                await ProductPropertyValues.query()
                    .where(raw(`property_value = '${propval[i].id}'`))
                    .then(prodPropVal => {
                        console.log(prodPropVal)
                        prodpropvalues.push(prodPropVal)
                    })
                    .catch(err => res.json(err.message))
            }
        }

        res.json(prodpropvalues)*/

        let propertyStr = ""
        if (properties !== undefined) {
            properties.map(elem => {
                propertyStr += `'${elem.name}',`
                /*elem.values.map(val => {
                    propertyStr += `'${val}',`
                })*/
                propertyStr = propertyStr.slice(0, -1)
                propertyStr += ')'
            })
        }

        knex.select('*')
        .from('product')
        .leftJoin('sub_category', function() {
            this
            .on('sub_category.id', '=', 'product.sub_category')
        })
        .leftJoin('property_subcategory', function () {
            this
            .on('property_subcategory.s')
        })
    }

    // --------- property CRUD ----------
    async createProperty(req, res) {
        const { name } = req.body
        await Property.query()
            .insert({ name })
            .then(property => res.json(property))
            .catch(err => res.json(err.message))
    }

    async updateProperty(req, res) {
        const id = req.params.id
        const { name } = req.body
        await Property.query()
            .patchAndFetchById(id, {
                name
            })
            .then(property => {
                if (property === null) res.json("Такой характеристики нет")
                else res.json(property)
            })
            .catch(err => res.json(err.message))
    }

    async deleteProperty(req, res) {
        const id = req.params.id
        await Property.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой характеристики нет")
                else res.json(`Характеристика с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getProperties(req, res) {
        await Property.query()
            .then(properties => res.json(properties))
            .catch(err => res.json(err))
    }
}

module.exports = new storefrontController()