const router = require('express').Router()
const productController = require('../controllers/productController')

router.get('/', productController.allProducts)
router.post('/', productController.createProduct)

module.exports = router

