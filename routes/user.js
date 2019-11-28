const express = require('express')
const router = express.Router()
const { createUser, loginUser, updateUser, deleteUser, readUser, logoutUser } = require('../controllers/user')
const auth = require('../middleware/auth')
// Routes

router.get('/user', auth, readUser)
router.post('/user/create', createUser)
router.post('/user/login', loginUser)
router.patch('/user/update', auth, updateUser)
router.delete('/user/delete', auth, deleteUser)
router.get('/user/logout', auth, logoutUser)

module.exports = router