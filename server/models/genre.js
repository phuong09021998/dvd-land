const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    }
}, {
    timestamps: true
})


const Genre = mongoose.model('Genre', genreSchema)

module.exports = Genre