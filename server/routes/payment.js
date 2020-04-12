const express = require('express')
const router = express.Router()
const { listOrders } = require('../controllers/payment')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
// Routes

router.get('/payment', auth, admin, listOrders)



module.exports = router