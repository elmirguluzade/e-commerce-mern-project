const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config({ path: './config.env' })
const morgan = require('morgan')
const productRouter = require('./routes/productRouter')

const app = express();
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))



//!Routes
app.use('/product', productRouter)

app.use((req, res) => {
    res.json({
        success: false,
        message: `${req.originalUrl} doesn't exist`
    })
})

// !Start application
const DB = process.env.DB_STRING.replace("<password>", process.env.DB_PASS)
mongoose.set("strictQuery", false);
mongoose.connect(DB, (err) => {
    if (err) return console.log(err.message);;
    console.log("MongoDB connected");
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`Server is listening in ${PORT}`))
})
