const express = require("express")
const User = require("../models/user")
const {requireSignin,isAdmin} = require('../middleware/authMiddleware')
const router = express.Router()
const {signup,login,forgotPasswordController} = require('../controllers/authController')

router.post('/signup',signup)
router.post('/login',login)
router.post('/forgot-password',forgotPasswordController)
//protected route
router.get('/user-dashboard',requireSignin,(req,res)=>{
    res.status(200).send({ok:true})
})
router.get('/admin-dashboard',requireSignin,isAdmin,async (req,res)=>{
    try {
        const admin = await User.findById(req.user.userId).select("-password -answer");
        if (!admin) {
          return res.status(404).send({ success: false, message: "Admin not found" });
        }
        res.status(200).json({ admin });
      } catch (error) {
        console.error("Admin fetch error:", error);
        res.status(500).send({
          success: false,
          message: "Error fetching admin",
          error,
        });
      }
})

  
module.exports=router