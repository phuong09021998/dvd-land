const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { getUserInfo, getUserById, getUsers, updateUserById, deleteUserById } = require('../controllers/admin')


router.get('/admin/user/:userId', auth, admin, getUserById)
router.get('/admin/users', auth, admin, getUsers)
router.patch('/admin/user/:userId', auth, admin, updateUserById)
router.delete('/admin/user/:userId', auth, admin, deleteUserById)

router.param('userId', getUserInfo)
module.exports = router