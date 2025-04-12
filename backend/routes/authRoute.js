const express = require("express")
const {requireSignin,isAdmin} = require('../middleware/authMiddleware')
const router = express.Router()
const {signup,login,forgotPasswordController} = require('../controllers/authController')
const {} = require('../middleware/authMiddleware')
router.post('/signup',signup)
router.post('/login',login)
router.post('/forgot-password',forgotPasswordController)
//protected route
router.get('/user-dashboard',requireSignin,(req,res)=>{
    res.status(200).send({ok:true})
})
router.get('/admin-dashboard',requireSignin,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})
module.exports=router