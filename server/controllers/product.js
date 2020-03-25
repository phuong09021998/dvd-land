const Product = require('../models/product')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')
const ObjectId = require('mongoose').Types.ObjectId

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

        
        let product = new Product(fields)
        genres = fields.genre.split(",")
        genres.map((item, i) => {
            product.genre = product.genre.concat({item})
        })

        if (file.photo) {
            if (file.photo.size > 4000000) {
                return res.status(400).json({err: "Image size cannot be more than 4Mb"})
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        


        product.save((err, product) => {
            if (err) {
                return res.status(400).json({err})
            }
            res.status(200).json({product})
        })
    })
}

exports.deleteProduct = (req, res) => {
    Product.findOneAndDelete({_id: req.product._id}, (err, product) => {
        if (err) {
            return res.status(400).json({err})
        }

        res.status(200).json({success: true})
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({err: "Image could not be loaded"})
        }

        let product = req.product
        product = _.extend(product, fields)
        if (file.photo) {
            if (file.photo.size > 4000000) {
                return res.status(400).json({err: "Image size cannot be more than 4Mb"})
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({err})
            }
            res.status(200).json({product})
        })

    })
}

exports.listProduct = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    Product.find()
    .select('-photo')
    .populate('item')
    .populate({
        path: 'genre.item',
        model: 'Genre'
    })
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
        if (err) {
            return res.status(400).json(err)
        }
        res.json(products)
    });
}

exports.productBySearch = (req, res) => {
    let order = req.query.order ? req.query.order : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    let skip = parseInt(req.query.skip)
    let findArgs = {}

    for (let key in req.body) {
        if(req.body[key].length > 0) {
            if (key === "key") {
                findArgs.name = {$regex: req.body.key, $options: 'i'}
            } else if (key === "genre") {
                findArgs.genre = {}
                findArgs.genre.$all = {}
                let items = []
                req.body.genre.map((one_item, i) => {
                    items.push({$elemMatch: {item: new ObjectId(one_item)}})
                })
                findArgs.genre.$all = items
            } else {
                findArgs.country = new ObjectId(req.body['country'])
            }
        }
       
    }

    Product.find(findArgs)
        .select('-photo')
        .populate({
            path: 'genre.item',
            model: 'Genre'
        })
        .populate('country')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json(err);
            }
            res.json(products);
    })
}

exports.listGenre = (req, res) => {
    Product.distinct('genre', {}, (err, genres) => {
        if (err) {
            return res.status(400).json(err)
        }
        res.json(genres)
    })
}

exports.listCountries = (req, res) => {
    Product.distinct('country', {}, (err, countries) => {
        if (err) {
            return res.status(400).json(err)
        }
        res.json(countries)
    })
}

exports.getPhoto = (req, res) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
}

exports.getHotSales = (req, res) => {
    Product.find({fixed_price: {$ne: null}})
    .select('-photo')
    .populate({
        path: 'genre.item',
        model: 'Genre'
    })
    .populate('country')
    .limit(8)
    .exec((err, products) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.json(products);
    })
}

// Middleware
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err) {
            return res.status(400).json({err})
        }

        req.product = product
        next()
    })
}