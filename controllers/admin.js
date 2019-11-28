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
        .select('-photo')
        .populate('history')
        .populate('wishList')
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

exports.updateUserById = (req, res) => {
    User.updateOne({_id: req.profile._id}, req.body, (err, user) => {
        if (err || !user) {
            res.status(400).json({
                err: 'User cannot be found'
            })
        }

        res.status(200).json({success: true})
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