const Router = require('express')
const router = new Router()
const controller = require('../controllers/storefront.controller')

// --------- main category CRUD ----------
router.post('/main_category', controller.createMainCategory)
router.put('/main_category/:id', controller.updateMainCategory)
router.delete('/main_category/:id', controller.deleteMainCategory)
router.get('/main_category', controller.getMainCategories)

// --------- sub category CRUD ----------
router.post('/sub_category', controller.createSubCategory)
router.put('/sub_category/:id', controller.updateSubCategory)
router.delete('/sub_category/:id', controller.deleteSubCategory)
router.get('/sub_category', controller.getSubCategories)

// --------- product CRUD and more ----------
router.get('/product/filter', controller.getFilteredProducts)
router.post('/product', controller.createProduct)
router.put('/product/:id', controller.updateProduct)
router.delete('/product/:id', controller.deleteProduct)
router.get('/product', controller.getProducts)
router.get('/product/:id', controller.getProductById)

// --------- property CRUD ----------
router.post('/property', controller.createProperty)
router.put('/property/:id', controller.updateProperty)
router.delete('/property/:id', controller.deleteProperty)
router.get('/property', controller.getProperties)

// --------- property value CRUD ----------
router.post('/property_value', controller.createPropertyValue)
router.put('/property_value/:id', controller.updatePropertyValue)
router.delete('/property_value/:id', controller.deletePropertyValue)
router.get('/property_value', controller.getPropertyValues)
router.get('/property_value/by_property', controller.getPropertyValueByProperty)

// --------- product property values CRUD ----------
router.post('/product_property_values', controller.createProductPropertyValues)
router.put('/product_property_values/:id', controller.updateProductPropertyValues)
router.delete('/product_property_values/:id', controller.deleteProductPropertyValues)
router.get('/product_property_values', controller.getProductPropertyValues)
router.get('/product_property_values/by_product', controller.getProductPropertyValuesByProduct)
router.get('/product_property_values/by_property_value', controller.getProductPropertyValuesByPropertyValue)


module.exports = router