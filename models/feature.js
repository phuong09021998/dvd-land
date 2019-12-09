const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const featureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        unique: true
    },
    video: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true,
        trim: true
    },
    origin: {
        type: ObjectId,
        required: true,
        ref: 'Product'
    }
}, {
    timestamps: true
})



const Feature = mongoose.model('Feature', featureSchema)

module.exports = Feature