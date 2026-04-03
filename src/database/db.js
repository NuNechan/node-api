const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/meda_app';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        
        process.exit(1);
    }
};

module.exports = connectDB;