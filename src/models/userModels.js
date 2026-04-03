const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true,
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,  
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 8 characters"],
        select: false 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: '' 
    },
    isActive: {
        type: Boolean,
        default: true,
        select: false
    }
}, { 
    timestamps: true 
});
const User = mongoose.model('User', userSchema);
module.exports = User;