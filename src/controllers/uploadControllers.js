const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadPath = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // 2. Use a more unique naming convention to avoid collisions
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});
const fileFilter = (req, file, cb) => {
    
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    const error = new Error('Only image files (JPEG, PNG, GIF) are allowed!');
    error.code = 'LIMIT_FILE_TYPES';
    cb(error, false);
};

const upload = multer({
    storage: diskStorage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
    }
});
exports.uploadFile = (req, res, next) => {
    try{
      upload.single('image')(req, res, err => {
    if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
    } else if (err) {
    return res.status(400).json({ error: err.message });
    }
    if(!req.file){
    return res.status(400).json({ error: "No file provided!" });
    }
    res.json({ message: 'Image uploaded successfully!'
    , file: req.file.filename });
    })
    }catch(error){
    next(error)
    }}
    exports.removeFile = (req, res, next) => {
        try{
        const image = req.params.imageUrl
        if(!image){
        return res.status(400).json({
        success: false,
        error: 'Image is required'
        })
        }
        const imagePath = path.join(__dirname, "../public/uploads", image);
        if(fs.existsSync(imagePath)){
        fs.unlinkSync(imagePath)
        return res.status(200).json({
        success: true,
        message: "Image deleted successfully!"
        })
        }else{
        res.status(404).json({
        success: false,
        error: "Image not found!"
        })
        }
        }catch(error){
        res.status(500).json({
        success: false,
        error:
        `Error occurred while deleting image!`
        })
        }
        }
       

