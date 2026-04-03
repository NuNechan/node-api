const bcrypt = require('bcryptjs')
const User = require('../models/userModels')
const jwt=require('jsonwebtoken')
require('dotenv').config();
exports.signUp=async(req,res,next)=>{
    try{
        const hashPassword = bcrypt.hashSync(req.body.password, 12)
        req.body.password = hashPassword
        const exist=await User.findOne({email:req.body.email})
        if(exist){
            return res.status(409).json({
                message:"Email already registered!,please try new email!"
            })
        }
        const data = await User.create(req.body);
       
console.log(req.body)
res.status(201).json({
    success:true,
    result:data
})
    }catch(error){
        next(error)
    }
}
exports.login = async (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
    const err = new Error('Please provide email or password!!')
    return next(err)
    }
    const userExist = await User.findOne({email}).select('+password')
    if(!userExist){
    const err = new Error('User does not exist!!')
    err.statusCode = 404
    return next(err)
    }
    const correct = bcrypt.compareSync(password, userExist.password)
    if(!correct){
    const err = new Error('Password incorrect!!')
    err.statusCode = 401
    return next(err)
    }
    userExist.password = undefined
   
    const token = jwt.sign(
        { email: userExist.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRE }
    );
    res.status(200).json({
    status: "success"
    ,
    message: "Login user successfully!"
    ,
    user: userExist,
    token: token
    })
    }
    exports.getMe = (req, res) => {
        res.status(200).json({
            success: true,
            result: req.user
        });
    };