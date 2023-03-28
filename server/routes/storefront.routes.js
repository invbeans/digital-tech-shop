const Router = require('express')
const { updateProductRemains, updateProductImage } = require('../controllers/storefront.controller')
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
router.get('/product/:id', controller.getProductById)
router.get('/product', controller.getProducts)

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
router.post('/property_value/by_property', controller.getPropertyValueByProperty)

// --------- property sub category CRUD ----------
//gets by field use POST method bc of body with field value
router.post('/property_sub_category', controller.createPropertySubCategory)
router.put('/property_sub_category/:id', controller.updatePropertySubCategory)
router.delete('/property_sub_category/:id', controller.deletePropertySubCategory)
router.get('/property_sub_category', controller.getPropertySubCategories)
router.post('/property_sub_category/by_sub_category', controller.getPropertySubCategoryBySubCategory)

// --------- product property values CRUD ----------
router.post('/product_property_values', controller.createProductPropertyValues)
router.put('/product_property_values/:id', controller.updateProductPropertyValues)
router.delete('/product_property_values/:id', controller.deleteProductPropertyValues)
router.get('/product_property_values', controller.getProductPropertyValues)
router.post('/product_property_values/by_product', controller.getProductPropertyValuesByProduct)
router.post('/product_property_values/by_property_value', controller.getProductPropertyValuesByPropertyValue)

// --------- product remains CRUD ----------
router.post('/product_remains', controller.createProductRemains)
router.put('/product_remains/:id', updateProductRemains)
router.delete('/product_remains/:id', controller.deleteProductRemains)
router.get('/product_remains/:id', controller.getProductRemainsById)

// --------- product image CRUD ----------
router.post('/product_image', controller.createProductImage)
router.put('/product_image/:id', updateProductImage)
router.delete('/product_image/:id', controller.deleteProductImage)
router.get('/product_image/:id', controller.getProductImageById)

// --------- supplier CRUD ----------
router.post('/supplier', controller.createSupplier)
router.put('/supplier/:id', controller.updateSupplier)
router.delete('/supplier/:id', controller.deleteSupplier)
router.get('/supplier/:id', controller.getSupplierById)
router.get('/supplier', controller.getSuppliers)

// --------- product image CRUD ----------
router.post('/manufacturer', controller.createManufacturer)
router.put('/manufacturer/:id', controller.updateManufacturer)
router.delete('/manufacturer/:id', controller.deleteManufacturer)
router.get('/manufacturer/:id', controller.getManufacturerById)
router.get('/manufacturer', controller.getManufacturers)

module.exports = router