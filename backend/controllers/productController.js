const Product = require('../model/product')

exports.allProducts = async (req, res) => {
    try {
        const products = Product.find()
        // !Searching
        if (req.query.search) {
            const pattern = `${req.query.search}`
            products.find({ title: { $regex: pattern, $options: "i" } })
        }
        // !Filtering
        const queryStr = { ...req.query };
        const restrictedFields = ["sort", "page", "limit", "size", "search"];
        restrictedFields.forEach((f) => delete queryStr[f]);
        let tempoQueryStr = JSON.stringify(queryStr).replace(
            /\b(gt|gte|lt|lte)\b/g,
            (atomic) => `$${atomic}`
        );
        products.find(JSON.parse(tempoQueryStr));
        if (req.query.size) {
            let sizes = req.query.size.split(',')
            products.find({ availableSizes: { $all: sizes } })
        }

        const allData = await products
        res.json({
            success: true,
            quantity: allData.length,
            allData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

exports.createProduct = async (req, res) => {

}