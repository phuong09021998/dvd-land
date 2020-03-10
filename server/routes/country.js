const express = require('express')
const router = express.Router()
const { getcountries, createcountry, getcountryById, getcountry, updatecountry, deletecountry } = require('../controllers/country')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')


router.get('/country', getcountries)
router.get('/admin/country/:countryId', auth, admin, getcountryById)
router.post('/admin/country/create', auth, admin, createcountry)
router.patch('/admin/country/update/:countryId', auth, admin, updatecountry)
router.delete('/admin/country/delete/:countryId', auth, admin, deletecountry)

router.param('countryId', getcountry)
module.exports = router