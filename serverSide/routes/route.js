/**
 * @param           {express}
 * 
 * @description     loading the express packabe to variable "express"
 */
const express=require('express')
/**
 * @param           {router}
 *@description        loading the Router functions to variable "router"
  */
const router=express.Router();
/**
 * @param           {userController}
 * 
 * @description     getting the functions in userContoller in from controller
 */
const userController=require('../controllers/userController');
/**
 * @param           {auth}
 * 
 * @description     getting the functions in autho.js from middleware
 */
var passport=require('passport')
router.use(passport.initialize());
router.use(passport.session());
// router.use(passport);
const auth=require('../middleware/autho')
//routing to the url's,controller and middleware
// const LocalStrategy = require('passport-local').Strategy;

router.route('/register').post(userController.register);
router.route('/registerVerify').get(auth.authentication,userController.saveUser)
router.route('/login').post(userController.login);
router.route('/forgetPassword').post(userController.forgotPassword);
//router.post('/reset',auth.authentication,userController.resetCtrl);
router. route('/reset').post(auth.authentication,userController.reset);

//router.post('/short',userController.shortCtrl)

router.route('/upload').post(userController.upload)
module.exports=router;