const express = require('express');
const { uploadFile, removeFile } = require('../controllers/uploadControllers');
const router = express.Router();
router.post('/',uploadFile);
router.delete('/:imageUrl',removeFile)
module.exports=router;