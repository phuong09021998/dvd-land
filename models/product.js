const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        unique: true
    },
    year: {
        type: Number,
        required: true,
        validate(value) {
            if (value <= 1895) {
                throw new Error('Year is invalid')
            }
        }
    },
    country: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: ObjectId,
        required: true,
        ref: 'Genre'
    },
    director: {
        type: String,
        required: true,
        trim: true
    },
    sale: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
})



const Product = mongoose.model('Product', productSchema)

module.exports = Product