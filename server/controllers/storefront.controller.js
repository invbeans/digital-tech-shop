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
const { knex } = require('knex')
const { transaction } = require('objection')

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
            .catch(err => res.json(err.message))
    }

    async getMainCategoriesByManufacturer(req, res) {
        const manufacturer = req.params.id
        await MainCategory.query()
            .distinct("main_category.*")
            .joinRelated('sub_category_rel.product_rel')
            .where('sub_category_rel:product_rel.manufacturer', manufacturer)
            .then(mainCategories => res.json(mainCategories))
            .catch(err => res.json(err.message))
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
            .catch(err => res.json(err.message))
    }

    async getSubCategoryById(req, res) {
        const id = req.params.id
        await SubCategory.query()
            .findById(id)
            .then(subCategory => res.json(subCategory))
            .catch(err => res.json(err.message))
    }

    async getSubCategoriesByMainCategory(req, res) {
        const main_category = req.params.id
        await SubCategory.query()
            .select("*")
            .where("main_category", "=", main_category)
            .then(subCategories => res.json(subCategories))
            .catch(err => res.json(err.message))
    }

    async getSubCategoriesByManufacturer(req, res) {
        const { manufacturer, main_category } = req.body
        await SubCategory.query()
            .distinct("sub_category.*")
            .where('main_category', main_category)
            .joinRelated("product_rel")
            .where("product_rel.manufacturer", manufacturer)
            .then(subCategories => res.json(subCategories))
            .catch(err => res.json(err.message))
    }

    // --------- product CRUD and more ----------
    async createProduct(req, res) {
        const { name, sub_category, price, rating, manufacturer, supplier } = req.body
        await Product.query()
            .insert({ name, sub_category, price, rating, manufacturer, supplier })
            .then(product => res.json(product))
            .catch(err => res.json(err.message))
    }

    async updateProduct(req, res) {
        const id = req.params.id
        const { name, sub_category, price, rating, manufacturer, supplier } = req.body
        await Product.query()
            .patchAndFetchById(id, {
                name, sub_category, price, rating, manufacturer, supplier
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
            .catch(err => res.json(err.message))
    }

    async getProductById(req, res) {
        const id = req.params.id
        await Product.query()
            .findById(id)
            .then(product => res.json(product))
            .catch(err => res.json(err.message))
    }

    async getProductByIdForProdPage(req, res) {
        const id = req.params.id
        await Product.query()
            .findById(id)
            .then(async product => {
                if (product === null) res.json("Такого товара нет")
                else {
                    let resProduct = {}
                    resProduct = { ...product }
                    await ProductImage.query().where('product', '=', product.id).then(productImg => { resProduct.image_link = productImg[0].image_link })
                    await ProductRemains.query().where('product', '=', product.id).then(productAmt => { resProduct.amount = productAmt[0].amount })
                    await Manufacturer.query().findById(product.manufacturer).then(manufacturer => { resProduct.manufacturer = manufacturer.name })
                    res.json(resProduct)
                }
            })
            .catch(err => res.json(err.message))
    }

    async getProductsBySubCategory(req, res) {
        const sub_category = req.params.id
        let prods = []
        await Product.query()
            .select("*")
            .where("sub_category", "=", sub_category)
            .then(async product => {
                for (const prod of product) {
                    let prodElem = {}
                    prodElem = { ...prod }
                    await ProductImage.query().where('product', '=', prod.id).then(productImg => { prodElem.image_link = productImg[0].image_link })
                    await ProductRemains.query().where('product', '=', prod.id).then(productAmt => { prodElem.amount = productAmt[0].amount })
                    prods.push(prodElem)
                }
                res.json(prods)
            })
            .catch(err => res.json(err.message))
    }

    async getProductsBySearch(req, res) {
        let { input } = req.body
        input = String(input)
        let prods = []

        await Product.query()
            .select("*")
            .where((query) => {
                input.split(' ').forEach(word => {
                    query.andWhere('name', 'ilike', `%${word}%`)
                })
            })
            .then(async product => {
                for (const prod of product) {
                    let prodElem = {}
                    prodElem = { ...prod }
                    await ProductImage.query().where('product', '=', prod.id).then(productImg => { prodElem.image_link = productImg[0].image_link })
                    await ProductRemains.query().where('product', '=', prod.id).then(productAmt => { prodElem.amount = productAmt[0].amount })
                    prods.push(prodElem)
                }
                res.json(prods)
            })
            .catch(err => res.json(err.message))
    }

    async getProductsByManufacturer(req, res) {
        const manufacturer = req.params.id
        let prods = []
        await Manufacturer.relatedQuery('product_rel')
            .for(manufacturer)
            .orderBy('rating', 'desc')
            .then(async products => {
                for (const product of products) {
                    let prodElem = {}
                    prodElem = { ...product }
                    await ProductImage.query().where('product', '=', product.id).then(productImg => { prodElem.image_link = productImg[0].image_link })
                    await ProductRemains.query().where('product', '=', product.id).then(productAmt => { prodElem.amount = productAmt[0].amount })
                    prods.push(prodElem)
                }
                res.json(prods)
            })
            .catch(err => res.json(err.message))
    }

    async getProductsByManufacturerAndSubCategory(req, res) {
        const { manufacturer, sub_category } = req.body
        let prods = []
        await Manufacturer.relatedQuery('product_rel')
            .for(manufacturer)
            .andWhere('sub_category', sub_category)
            .orderBy('rating', 'desc')
            .then(async products => {
                for (const product of products) {
                    let prodElem = {}
                    prodElem = { ...product }
                    await ProductImage.query().where('product', '=', product.id).then(productImg => { prodElem.image_link = productImg[0].image_link })
                    await ProductRemains.query().where('product', '=', product.id).then(productAmt => { prodElem.amount = productAmt[0].amount })
                    prods.push(prodElem)
                }
                res.json(prods)
            })
            .catch(err => res.json(err.message))
    }

    // 0-0 omg it is here
    async getFilteredProducts(req, res) {
        const { properties, price, brands } = req.body
        let products = []
        for (const property of properties) {
            await Product.query()
                .joinRelated('product_property_values_rel.property_value_rel.property_rel')
                .whereIn('value', property.values)
                .andWhere('product_property_values_rel:property_value_rel:property_rel.name', property.name)
                .joinRelated('manufacturer_rel')
                .whereIn('manufacturer_rel.name', brands)
                .andWhere('price', '>', price.min)
                .andWhere('price', '<', price.max)
                .select("*")
                .then(async foundPropVals => {
                    products.push(foundPropVals)
                })
                .catch(err => console.log(err.message))
        }
        res.json(products)
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
            .catch(err => res.json(err.message))
    }

    // --------- property value CRUD ----------
    async createPropertyValue(req, res) {
        const { property, value } = req.body
        await PropertyValue.query()
            .insert({ property, value })
            .then(propertyValue => res.json(propertyValue))
            .catch(err => res.json(err.message))
    }

    async updatePropertyValue(req, res) {
        const id = req.params.id
        const { property, value } = req.body
        await PropertyValue.query()
            .patchAndFetchById(id, {
                property, value
            })
            .then(propertyValue => {
                if (propertyValue === null) res.json("Такой записи 'характеристика-значение' нет")
                else res.json(propertyValue)
            })
            .catch(err => res.json(err.message))
    }

    async deletePropertyValue(req, res) {
        const id = req.params.id
        await PropertyValue.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой записи 'характеристика-значение' нет")
                else res.json(`Характеристика-значение с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getPropertyValues(req, res) {
        await PropertyValue.query()
            .then(propertyValue => res.json(propertyValue))
            .catch(err => res.json(err.message))
    }

    async getPropertyValueByProperty(req, res) {
        const property = req.params.id
        await PropertyValue.query()
            .select('*')
            .where('property', '=', property)
            .then(propertyValue => res.json(propertyValue))
            .catch(err => res.json(err.message))
    }

    // --------- property sub category CRUD ----------
    async createPropertySubCategory(req, res) {
        const { property, sub_category } = req.body
        await PropertySubCategory.query()
            .insert({ property, sub_category })
            .then(propSubCat => res.json(propSubCat))
            .catch(err => res.json(err.message))
    }

    async updatePropertySubCategory(req, res) {
        const id = req.params.id
        const { property, sub_category } = req.body
        await PropertySubCategory.query()
            .patchAndFetchById(id, {
                property, sub_category
            })
            .then(propSubCat => {
                if (propSubCat === null) res.json("Такой записи 'подкатегория-характеристика' нет")
                else res.json(propSubCat)
            })
            .catch(err => res.json(err.message))
    }

    async deletePropertySubCategory(req, res) {
        const id = req.params.id
        await PropertySubCategory.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой записи 'подкатегория-характеристика' нет")
                else res.json(`Подкатегория-характеристика с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getPropertySubCategories(req, res) {
        await PropertySubCategory.query()
            .then(propSubCat => res.json(propSubCat))
            .catch(err => res.json(err.message))
    }

    async getPropertySubCategoryBySubCategory(req, res) {
        const sub_category = req.params.id
        await PropertySubCategory.query()
            .select("*")
            .where("sub_category", "=", sub_category)
            .then(prodPropVal => res.json(prodPropVal))
            .catch(err => res.json(err.message))
    }

    // --------- product property values CRUD ----------
    async createProductPropertyValues(req, res) {
        const { product, property_value } = req.body
        await ProductPropertyValues.query()
            .insert({ product, property_value })
            .then(prodPropVal => res.json(prodPropVal))
            .catch(err => res.json(err.message))
    }

    async updateProductPropertyValues(req, res) {
        const id = req.params.id
        const { product, property_value } = req.body
        await ProductPropertyValues.query()
            .patchAndFetchById(id, {
                product, property_value
            })
            .then(prodPropVal => {
                if (prodPropVal === null) res.json("Такой записи 'товар-значение' нет")
                else res.json(prodPropVal)
            })
            .catch(err => res.json(err.message))
    }

    async deleteProductPropertyValues(req, res) {
        const id = req.params.id
        await ProductPropertyValues.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой записи 'товар-значение' нет")
                else res.json(`Товар-значение с id = ${id} удален`)
            })
            .catch(err => res.json(err.message))
    }

    async getProductPropertyValues(req, res) {
        await ProductPropertyValues.query()
            .then(prodPropVal => res.json(prodPropVal))
            .catch(err => res.json(err.message))
    }

    async getProductPropertyValuesByProduct(req, res) {
        const product = req.params.id
        await ProductPropertyValues.query()
            .select('*')
            .where('product', '=', product)
            .then(prodPropVal => res.json(prodPropVal))
            .catch(err => res.json(err.message))
    }

    async getProductPropertyValuesByPropertyValue(req, res) {
        const property_value = req.params.id
        await ProductPropertyValues.query()
            .select('*')
            .where('property_value', '=', property_value)
            .then(prodPropVal => res.json(prodPropVal))
            .catch(err => res.json(err.message))
    }

    async getProductPropValInfo(req, res) {
        let productPropVals = []
        const product = req.params.id
        await PropertyValue.query()
            .select("*")
            .joinRelated('product_property_values_rel', { alias: 'ppv' })
            .where('ppv.product', product)
            .then(async propertyValues => {
                for (const propVal of propertyValues) {
                    let prodPropValElem = {}
                    await Property.query()
                        .findById(propVal.property)
                        .then(property => {
                            prodPropValElem.property = property.name
                            prodPropValElem.property_value = propVal.value
                            productPropVals.push(prodPropValElem)
                        })
                }
                res.json(productPropVals)
            }).catch(err => res.json(err.message))
    }

    // --------- product remains CRUD ----------
    async createProductRemains(req, res) {
        const { product, amount } = req.body
        await ProductRemains.query()
            .insert({ product, amount })
            .then(productRemains => res.json(productRemains))
            .catch(err => res.json(err.message))
    }

    async updateProductRemains(req, res) {
        const id = req.params.id
        const { product, amount } = req.body
        await ProductRemains.query()
            .patchAndFetchById(id, {
                product, amount
            })
            .then(productRemains => {
                if (productRemains === null) res.json("Такой записи о количестве товара нет")
                else res.json(productRemains)
            })
            .catch(err => res.json(err.message))
    }

    async deleteProductRemains(req, res) {
        const id = req.params.id
        await ProductRemains.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такой записи о количестве товара нет")
                else res.json(`Запись о количестве товара с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getProductRemainsById(req, res) {
        const { product } = req.params.id
        await ProductRemains.query()
            .findById(product)
            .then(productRemains => res.json(productRemains))
            .catch(err => res.json(err.message))
    }

    // --------- product image CRUD ----------
    async createProductImage(req, res) {
        const { product, image_link } = req.body
        await ProductImage.query()
            .insert({ product, image_link })
            .then(productRemains => res.json(productRemains))
            .catch(err => res.json(err.message))
    }

    async updateProductImage(req, res) {
        const id = req.params.id
        const { product, image_link } = req.body
        await ProductImage.query()
            .patchAndFetchById(id, {
                product, image_link
            })
            .then(productImage => {
                if (productImage === null) res.json("Такого изображения товара нет")
                else res.json(productImage)
            })
            .catch(err => res.json(err.message))
    }

    async deleteProductImage(req, res) {
        const id = req.params.id
        await ProductImage.query()
            .deleteById(id)
            .then(amount => {
                if (amount == 0) res.json("Такого изображения товара нет")
                else res.json(`Запись об изображении товара с id = ${id} удалена`)
            })
            .catch(err => res.json(err.message))
    }

    async getProductImageById(req, res) {
        const { product } = req.params.id
        await ProductImage.query()
            .findById(product)
            .then(productImage => res.json(productImage))
            .catch(err => res.json(err.message))
    }

    // --------- supplier CRUD ----------
    async createSupplier(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const { name, email, phone } = req.body
            await Supplier.query()
                .insert({ name, email, phone })
                .then(supplier => res.json(supplier))
                .catch(err => res.json(err.message))
        }
    }

    async updateSupplier(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const id = req.params.id
            const { name, email, phone } = req.body
            await Supplier.query()
                .patchAndFetchById(id, {
                    name, email, phone
                })
                .then(async supplier => {
                    if (supplier === undefined) {
                        await Supplier.query()
                            .insert({ name, email, phone })
                            .then(supplier => {
                                res.json(supplier)
                            })
                    }
                    else res.json(supplier)
                })
                .catch(err => res.json(err.message))
        }
    }

    async deleteSupplier(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const id = req.params.id
            await Supplier.query()
                .deleteById(id)
                .then(amount => {
                    if (amount == 0) res.json("Такого поставщика нет")
                    else res.json(`Поставщик с id = ${id} удалён`)
                })
                .catch(err => res.json(err.message))
        }
    }

    async getSuppliers(req, res) {
        await Supplier.query()
            .then(supplier => res.json(supplier))
            .catch(err => res.json(err.message))
    }

    async getSupplierById(req, res) {
        const id = req.params.id
        await Supplier.query()
            .findById(id)
            .then(supplier => {
                if (supplier === null) res.json("Такого поставщика нет")
                else res.json(supplier)
            })
            .catch(err => res.json(err.message))
    }

    // --------- manufacturer CRUD ----------
    async createManufacturer(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const { name, email } = req.body
            await Manufacturer.query()
                .insert({ name, email })
                .then(manufacturer => res.json(manufacturer))
                .catch(err => res.json(err.message))
        }
    }

    async updateManufacturer(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const id = req.params.id
            const { name, email } = req.body
            await Manufacturer.query()
                .patchAndFetchById(id, {
                    name, email
                }).then(async manufacturer => {
                    if (manufacturer === undefined) {
                        await Manufacturer.query()
                            .insert({ name, email })
                            .then(manufacturer => {
                                res.json(manufacturer)
                            })
                    }
                    else res.json(manufacturer)
                })
                .catch(err => res.json(err.message))
        }
    }

    async deleteManufacturer(req, res) {
        if (req.message) {
            res.status(401).json(req.message)
        }
        else {
            const id = req.params.id
            await Manufacturer.query()
                .deleteById(id)
                .then(amount => {
                    if (amount == 0) res.json("Такого производителя нет")
                    else res.json(`Производитель с id = ${id} удалён`)
                })
                .catch(err => res.json(err.message))
        }
    }

    async getManufacturers(req, res) {
        await Manufacturer.query()
            .then(manufacturer => res.json(manufacturer))
            .catch(err => res.json(err.message))
    }

    async getManufacturerById(req, res) {
        const id = req.params.id
        await Manufacturer.query()
            .findById(id)
            .then(manufacturer => {
                if (manufacturer === null) res.json("Такого производителя нет")
                else res.json(manufacturer)
            })
            .catch(err => res.json(err.message))
    }
}

module.exports = new storefrontController()