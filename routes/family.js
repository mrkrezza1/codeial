// const express=require('express');
// const router=express.Router();
// const familyController=require('../controllers/family_controller')  
// router.get('/',familyController.family)
// module.exports=router;

const express=require('express');
const router=express.Router();
const familyController=require('../controllers/family_controller');
router.get('/',familyController.family)
module.exports=router;