const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const protectRoute = async (req, res, next) => {
    let token = null;

    
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    } 

    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Unauthorized access. Token missing.' 
        });
    }

    try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({email:decoded.user.email}).populate('role');

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'The user belonging to this token no longer exists.' 
            });
        }

        
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT ERROR:", err.message);
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid or expired token.' 
        });
    }
};

module.exports = protectRoute;