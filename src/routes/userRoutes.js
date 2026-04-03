const express=require('express')
const { signUp,login, getMe } = require('../controllers/userController')
const protectRoute = require('../middleware/protectRouters')

const router=express.Router()
router.post('/signup',signUp)
router.post('/login',login)
router.get('/me',protectRoute,getMe)
module.exports=router