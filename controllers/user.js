const User = require('../models/user')
const bcrypt = require('bcrypt')

exports.readUser = (req, res) => {
    res.status(200).json({
        user: req.user
    })
}


exports.createUser = (req, res) => {
    const user = new User(req.body)
    user.generateToken((err, user) => {
        if (err) {
            return res.status(400).json({err})
        }

        user.password = undefined
        res.cookie('c_auth', user.token).status(200).json({user})
    })
}

exports.loginUser = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({email}, (err, user) => {
        if (err) {
            return res.status(400).json({err})
            
        }
        bcrypt.compare(password, user.password, (err, valid) => {
            if (err) {
                throw new Error('Something went wrong')
            }
            if (!valid) {
                return res.status(400).json({err: 'Password is incorrect'})
            }
            user.generateToken((err, user) => {
                if (err) {
                    return res.status(400).json({err})
                }
        
                user.password = undefined
                res.cookie('c_auth', user.token).status(200).json({user})
            })
        })
    })
}



exports.updateUser = (req, res) => {
    User.updateOne({_id: req.user._id}, req.body, (err, user) => {
        if (err || !user) {
            res.status(400).json({
                err: 'User cannot be found'
            })
        }

        res.status(200).json({success: true})
    })
}

exports.deleteUser = (req, res) => {
    User.deleteOne({_id: req.user._id}, (err, user) => {
        if (err) {
            return res.status(400).json({err})
        }
        res.status(200).json({
            success: true
        })
    })
}

exports.logoutUser = (req, res) => {
    User.updateOne({_id: req.user._id}, {token: ''}, (err, user) => {
        if (err || !user) {
            res.status(400).json({
                err: 'User cannot be found'
            })
        }

        res.status(200).json({
            success: true
        })
    })
}