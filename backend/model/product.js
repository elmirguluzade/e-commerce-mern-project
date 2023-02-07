const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    availableSizes: {
        type: [String],
        enum: ["XS", "S", "M", "ML", "L", "XL", "XXL"],
        required: [true, "Sizes must be declared"]
    },
    currencyId: {
        type: String,
        required: [true, "Currency must be declared"],
    },
    description: {
        type: String,
    },
    isFreeShipping: {
        type: Boolean,
        required: [true, "Whether shipping free or not must be declared"]
    },
    price: {
        type: Number,
        required: [true, "Price must be declared"]
    },
    title: {
        type: String,
        required: [true, "Title must be declared"]
    }
}, { timestamps: true })


const Product = mongoose.model('product', productSchema);

module.exports = Product;