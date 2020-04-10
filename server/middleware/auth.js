const User = require('../models/user')

const auth = (req, res, next) => {
    const token = req.cookies.c_auth

    // User.findByToken(token)
    //     .exec((err, user) => {
    //     if (err || !user) {
    //         res.status(400).json({
    //             err: 'You are not currently login'
    //         })
    //     }

    //     req.token = token
    //     req.user = user
    //     next()
    // })

    User.findByToken(token, (err, user) => {
        if (err || !user) {
            res.status(400).json({
                err: 'You are not currently login'
            })
        }

        req.token = token
        req.user = user
        next()
    })
}

module.exports = auth