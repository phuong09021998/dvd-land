const express = require('express')
const router = express.Router()
const { getGenres, createGenre, getGenreById, getGenre, updateGenre, deleteGenre } = require('../controllers/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')


router.get('/genre', getGenres)
router.get('/admin/genre/:genreId', auth, admin, getGenreById)
router.post('/admin/genre/create', auth, admin, createGenre)
router.patch('/admin/genre/update/:genreId', auth, admin, updateGenre)
router.delete('/admin/genre/delete/:genreId', auth, admin, deleteGenre)

router.param('genreId', getGenre)
module.exports = router