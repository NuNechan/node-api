const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        maxlength: [100, "Name cannot exceed 100 characters"]
    },
    noted: {
        type: String,
        default:"",
        trim: true
    },
    salePrice: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Product must belong to a category"]
    },
    image: [{
        type: String,
        required: [true, "At least one image is required"]
    }],
    currentStock: {
        type: Number,
        required: [true, "Stock quantity is required"],
        min: [0, "Stock cannot be negative"],
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true,
    
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;