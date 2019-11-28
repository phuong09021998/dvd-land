const User = require('../models/user')

const auth = (req, res, next) => {
    const token = req.cookies.c_auth
    User.findByToken(token, (err, user) => {
        if (err || !user) {
            res.status(400).json({
                err: 'Something went wrong'
            })
        }

        req.token = token
        req.user = user
        next()
    })
}

module.exports = auth