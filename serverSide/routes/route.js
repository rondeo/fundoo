const express=require('express')
const router=express.Router();
const userController=require('../controllers/user.controllers');
const auth=require('../middelware/authentication')
router.post("/register",userController.registerCtrl)
router.get("/registerVerify",auth.authentication,userController.saveUserCtrl)
router.post('/login',userController.loginCtrl);
router.post('/fogetpassword',userController.forgetCtrl);
router.post('/reset',auth.authentication,userController.resetCtrl);
router.post('/short',userController.shortCtrl)

module.exports=router;