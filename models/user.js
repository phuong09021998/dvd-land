const mongoose = require('mongoose')
const validator = require('validator')
const { ObjectId } = mongoose.Schema
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    history: [{
        item: {
            type: ObjectId,
            ref: 'Product'
        }
    }],
    cart: [{
        item: {
            type: ObjectId,
            ref: 'Product'
        }
    }],
    role: {
        type: Number,
        default: 0
    },
    age: {
        type: Number,
        default: 0,
    },
    gender: {
        type: Boolean,
    },
    address: {
        type: String,
    },
    wishList: [{
        item: {
            type: ObjectId,
            ref: 'Product'
        }
    }],
    token: {
        type: String,
    }
}, {
    timestamps: true
})

// Middlewares

userSchema.pre('save' ,function (next) {
    let user = this
    if (user.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) {
                throw new Error('Something went wrong')
            }
    
            user.password = hash
            next()
        })
    } else {
        next()
    }
    
})

userSchema.methods.generateToken = function (cb) {
    let user = this
    const token = jwt.sign(user._id.toHexString(), process.env.SECRET)
    user.token = token

    user.save((err, user) => {
        if (err) {
            return cb(err)
        }
        return cb(undefined, user)
    })
} 

userSchema.statics.findByToken = function (token, cb) {
    jwt.verify(token, process.env.SECRET, (err, decode) => {
        User.findOne({_id: decode, token: token}, (err, user) => {
            if (err) {
                cb(err)
            }
            cb(undefined, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User