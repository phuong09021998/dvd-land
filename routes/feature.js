const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { createFeature, getFeature, featureById, getFeatureById, updateFeature, videoFeature, deleteFeature } = require('../controllers/feature')


router.post('/admin/feature/create', auth, admin, createFeature)
router.get('/admin/feature/:featureId', auth, admin, getFeatureById)
router.get('/feature/', getFeature)
router.patch('/admin/feature/update/:featureId', updateFeature)
router.get('/feature/video/:featureId', videoFeature)
router.delete('/admin/feature/delete/:featureId', auth, admin, deleteFeature)

router.param('featureId', featureById)
module.exports = router