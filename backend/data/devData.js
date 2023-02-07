const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const Product = require('../model/product')
require('dotenv').config({ path: './config.env' })



const DB = process.env.DB_STRING.replace("<password>", process.env.DB_PASS)
mongoose.set("strictQuery", false);
mongoose.connect(DB, (err) => {
    if (err) return err.message

    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'commerceData.json'), 'utf-8'))
    const importData = async () => {
        try {
            await Product.create(data.products)
            console.log("MongoDb data imported"); 
        } catch (e) {
            console.log(e.message);
        }
        process.exit()
    }

    const deleteData = async () => {
        try {
            await Product.deleteMany()
            console.log("MongoDb data deleted"); 
        } catch (e) {
            console.log(e.message);  
        }
        process.exit()
    }

    if (process.argv[2] === "import") {
        importData();
    }
    else if (process.argv[2] === "delete") {
        deleteData();
    }
})
