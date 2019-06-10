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
const auth=require('../middleware/autho')
//routing to the url's,controller and middleware

router.route('/register').post(userController.register)
router.get('/registerVerify',auth.authentication,userController.saveUserCtrl)
router.route('/login').post(userController.login);
router.post('/fogetpassword',userController.forget);
//router.post('/reset',auth.authentication,userController.resetCtrl);
router. route('/reset').post(userController.reset);

//router.post('/short',userController.shortCtrl)

module.exports=router;