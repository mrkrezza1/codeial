const express=require('express');
const router=express.Router();//here the express is fetching the data of the routes by using the parent index.js
const homeController=require('../controllers/home_controller')//here we are trying to fetching the data of the router by controllers 
console.log("router is loaded")//
router.get('/',homeController.home);//here we are calling the homecontroller with the home
// router.get('/',homeController.baba);
module.exports=router;