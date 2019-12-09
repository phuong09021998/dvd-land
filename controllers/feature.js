const Feature = require('../models/feature')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')
const ObjectId = require('mongoose').Types.ObjectId

exports.createFeature = (req, res) => {
    console.log('OK')
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({err})
        }

        
        let feature = new Feature(fields)


        if (file.video) {
            if (file.video.size > 5000000) {
                return res.status(400).json({err: "Video size cannot be more than 5Mb"})
            }
            feature.video.data = fs.readFileSync(file.video.path)
            feature.video.contentType = file.video.type
        }
        

        

        feature.save((err, feature) => {
            if (err) {
                return res.status(400).json(err)
            }
            res.status(200).json(feature)
        })
    })
}

exports.getFeatureById = (req, res) => {
    req.feature.video = undefined
    res.status(200).json(req.feature)
}

exports.getFeature = (req, res) => {
    let order = req.query.order ? req.query.order : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt'
    let limit = req.query.limit ? parseInt(req.query.limit) : 3
    Feature.find()
    .select('-video')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, features) => {
        if (err) {
            return res.status(400).json(err)
        }
        res.json(features)
    });
}

exports.updateFeature = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({err: "Video could not be loaded"})
        }

        let feature = req.feature
        feature = _.extend(feature, fields)
        if (file.video) {
            if (file.video.size > 5000000) {
                return res.status(400).json({err: "Video size cannot be more than 5Mb"})
            }
            feature.video.data = fs.readFileSync(file.video.path)
            feature.video.contentType = file.video.type
        }
        feature.save((err, feature) => {
            if (err) {
                return res.status(400).json({err})
            }
            res.status(200).json({feature})
        })

    })
}

exports.videoFeature = (req, res) => {
    if (req.feature.video) {
        res.set('Content-Type', req.feature.video.contentType);
        return res.send(req.feature.video.data);
    }
}

exports.deleteFeature = (req, res) => {
    Feature.findByIdAndDelete(req.feature.id, (err, feature) => {
        if (err) {
            return res.status(400).json({err})
        }

        res.json({success: true})
    })
}

// Middleware
exports.featureById = (req, res, next, id) => {
    Feature.findById(id).exec((err, feature) => {
        if (err) {
            return res.status(400).json({err})
        }

        req.feature = feature
        next()
    })
}