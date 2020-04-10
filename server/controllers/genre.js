const Genre = require('../models/genre')

exports.getGenres = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name'
    // Genre.find({}, (err, genres) => {
    //     if (err) {
    //         return res.status(400).json({err})
    //     }

    //     res.status(200).json({genres})
    // })
    Genre.find().sort([[sortBy, order]])
    .exec((err, genres) => {
        if (err) {
            return res.status(400).json({err})
        }

        res.status(200).json({genres})
    });
}

exports.createGenre = (req, res) => {
    const genre = new Genre(req.body)
    genre.save((err, genre) => {
        if (err) {
            return res.status(400).json({err})
        }

        res.status(200).json({genre})
    })
}

exports.getGenreById = (req, res) => {
    const genre = req.genre
    res.status(200).json({genre})
}

exports.updateGenre = (req, res) => {
    Genre.findOneAndUpdate({_id: req.genre._id}, req.body, {new: true},(err, genre) => {
        if (err) {
            return res.status(400).json({err})
        }

        res.status(200).json({genre})
    })
}

exports.deleteGenre = (req, res) => {
    Genre.findOneAndDelete({_id: req.genre._id},(err, genre) => {
        if (err) {
            return res.status(400).json({err})
        }

        res.status(200).json({genre})
    })
}


// Middleware
exports.getGenre = (req, res, next, id) => {
    Genre.findById(id, (err, genre) => {
        if (err) {
            return res.status(400).json({err})
        }

        req.genre = genre
        next()
    })
}
