const express = require('express')
const router = express.Router()
const { getProductById, productById, createProduct, deleteProduct, updateProduct, listProduct, productBySearch, listGenre, getPhoto, listCountries } = require('../controllers/product')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/product/:productId', getProductById)
router.get('/products', listProduct)
router.get('/genres', listGenre)
router.get('/countries', listCountries)
router.get('/photo/:productId', getPhoto)
router.post('/admin/product/create', auth, admin, createProduct)
router.post('/product/search', productBySearch)
router.post('/admin/product/create', auth, admin, createProduct)
router.patch('/admin/product/update/:productId', auth, admin, updateProduct)
router.delete('/admin/product/:productId', auth, admin, deleteProduct)

router.param('productId', productById)
module.exports = router