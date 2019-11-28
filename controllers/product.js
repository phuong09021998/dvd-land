const Product = require('../models/product')
const formidable = require('formidable')
const fs = require('fs')


exports.getProductById = (req, res) => {
    return res.status(200).json({product: req.product})
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({err})
        }

        if (file.photo.size > 1000000) {
            return res.status(400).json({err: "Image size cannot be more than 1Mb"})
        }

        let product = new Product(fields)
        product.photo.data = fs.readFileSync(file.photo.path)
        product.photo.contentType = file.photo.type

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({err})
            }

            res.status(200).json({product})
        })
    })

}

// Middleware
exports.productById = (req, res, next, id) => {
    Product.findById(id, (err, product) => {
        if (err) {
            return res.status(400).json({err})
        }

        req.product = product
        next()
    })
}