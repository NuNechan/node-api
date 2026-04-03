require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')

const cors = require('cors');
const path = require('path');
const connectDB = require('./src/database/db');
const categoryRoutes=require('./src/routes/categoryRoutes');
const uploadRoutes=require('./src/routes/uploadRoutes')
const productRoutes=require('../node-api/src/routes/productRoutes')
const userRoutes=require('../node-api/src/routes/userRoutes')
const errorHander = require('./helper/error-handler');
const app = express();
connectDB();
const PORT = process.env.PORT || 3000;
app.use(cors()); 
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'src/public/uploads')));
app.use(cookieParser())
app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/product',productRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/categories', categoryRoutes);

app.use(errorHander)
app.get('/', (req, res) => {
    res.status(200).send("Welcome to the Node.js API!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});