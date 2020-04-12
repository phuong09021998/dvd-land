const User = require('../models/user')


exports.getUserById = (req, res) => {
    res.status(200).json({
        user: req.profile
    })
}


// Middleware
exports.getUserInfo = (req, res, next, id) => {
    User.findOne({_id: id}, (err, user) => {
        if (err) {
            return res.status(400).json({err})
        }

        req.profile = user
        next()
    })
}

exports.getUsers = (req, res) => {
    console.log(req.query)
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 12
    let skip = req.query.skip ? parseInt(req.query.skip) : 0

    User.find()
        .populate('cart')
        .skip(skip)
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({err})
            }
    
            res.status(200).json({users})
        }) 

}

exports.userSearch = (req, res) => {
    let order = req.query.order ? req.query.order : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : 'email'
    let limit = req.query.limit ? parseInt(req.query.limit) : 9999
    let findArgs = {}

    findArgs.email = {$regex: req.body.email, $options: 'i'}

    User.find(findArgs)
    .populate('history')
    .populate('cart')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, users) => {
        if (err) {
            return res.status(400).json({err})
        }

        res.status(200).json({users})
    }) 

}

exports.updateUserById = (req, res) => {
    User.findOneAndUpdate({_id: req.profile._id}, req.body, {new: true},(err, user) => {
        if (err || !user) {
            res.status(400).json({
                err: 'User cannot be found'
            })
        }

        res.status(200).json(user)
    })
}

exports.deleteUserById = (req, res) => {
    User.deleteOne({_id: req.profile._id}, (err, user) => {
        if (err) {
            return res.status(400).json({err})
        }
        res.status(200).json({
            success: true
        })
    })
}