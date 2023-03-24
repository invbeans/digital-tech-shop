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

module.exports = router