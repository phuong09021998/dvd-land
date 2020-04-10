const express = require('express')
const router = express.Router()
const { createUser, loginUser, updateUser, deleteUser, readUser, logoutUser, checkUser, addToCart, removeFromCart, getCartItem, getProductFromCart } = require('../controllers/user')
const auth = require('../middleware/auth')
// Routes

router.get('/user', auth, readUser)
router.post('/user/create', createUser)
router.post('/user/login', loginUser)
router.patch('/user/update', auth, updateUser)
router.delete('/user/delete', auth, deleteUser)
router.get('/user/logout', auth, logoutUser)
router.post('/user/check', checkUser)
router.post('/user/addtocart', auth, addToCart)
router.get('/user/removefromcart', auth, removeFromCart)
router.get('/user/cartitem', auth, getCartItem)
router.post('/user/productfromcart', getProductFromCart)



module.exports = router