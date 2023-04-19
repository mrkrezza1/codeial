const express =require('express');
const router=express.Router();
const userControllers=require('../controllers/user_controllers')
router.get('/profile',userControllers.profile)
console.log("profile is loaded");
module.exports=router;