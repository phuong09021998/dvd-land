const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    }
}, {
    timestamps: true
})


const Country = mongoose.model('country', countrySchema)

module.exports = Country