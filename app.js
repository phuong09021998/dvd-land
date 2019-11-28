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
const productRoutes = require('./routes/porduct')
const genreRoutes = require('./routes/genre')
const featureRoutes = require('./routes/features')

// App
const app = express()

// Db
mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(() => console.log('DB connected'))

// Middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())

// Routes middlewares
app.use('/api', adminRoutes)
app.use('/api', userRoutes)
app.use('/api', productRoutes)
app.use('/api', genreRoutes)
app.use('/api', featureRoutes)


// Listen
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`)
})