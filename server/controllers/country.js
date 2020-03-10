const Country = require('../models/country')

exports.getcountries = (req, res) => {
    console.log('OK')
    Country.find({}, (err, countries) => {
        if (err) {
            return res.status(400).json({err})
        }

        res.status(200).json({countries})
    })
}

exports.createcountry = (req, res) => {
    console.log('OK')
    const country = new Country(req.body)
    country.save((err, country) => {
        if (err) {
            return res.status(400).json({err})
        }

        res.status(200).json({country})
    })
}

exports.getcountryById = (req, res) => {
    const country = req.country
    res.status(200).json({country})
}

exports.updatecountry = (req, res) => {
    Country.findOneAndUpdate({_id: req.country._id}, req.body, {new: true},(err, country) => {
        if (err) {
            return res.status(400).json({err})
        }

        res.status(200).json({country})
    })
}

exports.deletecountry = (req, res) => {
    Country.findOneAndDelete({_id: req.country._id},(err, country) => {
        if (err) {
            return res.status(400).json({err})
        }

        res.status(200).json({country})
    })
}


// Middleware
exports.getcountry = (req, res, next, id) => {
    console.log('Xoa')
    Country.findById(id, (err, country) => {
        if (err) {
            return res.status(400).json({err})
        }

        req.country = country
        next()
    })
}
