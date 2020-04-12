const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

// Import routes
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const genreRoutes = require('./routes/genre')
const countryRouter = require('./routes/country')
const paymentRouter = require('./routes/payment')

// App
const app = express()

// Db
mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('DB connected'))

// Middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('client/build'))

// Routes middlewares
app.use('/api', adminRoutes)
app.use('/api', userRoutes)
app.use('/api', productRoutes)
app.use('/api', genreRoutes)
app.use('/api', countryRouter)
app.use('/api', paymentRouter)

// DEFAULT
if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname), '../client', 'build', 'index.html')
    })
}


// Listen
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`)
})