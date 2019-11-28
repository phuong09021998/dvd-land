const express = require('express')
const router = express.Router()
const { getProductById, productById, createProduct} = require('../controllers/product')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/product/:productId', getProductById)
router.post('/admin/product/create', auth, admin, createProduct)

router.param('productId', productById)
module.exports = router