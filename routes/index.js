const express=require('express');
const router=express.Router();//here the express is fetching the data of the routes by using the parent index.js
const homeController=require('../controllers/home_controller')//here we are trying to fetching the data of the router by controllers 
console.log("router is loaded")//
module.exports=router;