const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
    trim: true, 
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"]
  },
  note: {
    type: String,
    trim: true,
    default: "" 
  },
  
}, { 
  timestamps: true,

});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;