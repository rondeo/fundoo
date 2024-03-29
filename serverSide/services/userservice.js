/**
 * @param       {model}
 * 
 * @description loading the models from model.js
 */
const model=require('../app/modules/module');

/**
 * @function    register
 * 
 * @description used to call the register model
 */
exports.register=(data,callback)=>{
 
    //calling the register model
    model.register(data,(err,result)=>{
        if(err)
        {
            //sending the errors to controller to display
            callback(err,result);    
        }
        else{
            //sending the result to controller with 0 errors 
            callback(null,result);
        }
        
    })
}
/**
 * @function    saveUser
 * 
 * @description     used to call the saveUser model
 */
exports.saveUser=(data,callback)=>{
    

    model.saveUser(data,(err,result)=>{
        if(err){
            console.log(err);
            callback(err,result);
            
        }
        else{
            callback(null,result);
        }

    })
}

/**
 * @function    login
 * 
 * @description used to call the login model
 */
exports.login=(data,callback)=>{

        //calling the login model

    model.login(data,(err,result)=>{
        if(err)
        {
        //sending the errors to controller to display
            callback(err,result)
        }
        else{
            //sending the result to controller with 0 errors
            callback(null,result)
        }
    })
}

/**
 * @function    forget
 * 
 * @description used to call the forget model
 */
exports.forgotPassword=(data,callback)=>{
    console.log("forgetpassword services");
    
    model.forgotPassword(data,(err,result)=>{

        if(err){
            callback(err,result);
        }
        else{
            callback(null,result);
        }
    })
}
/**
 * @function    reset
 * 
 * @description used to call the reset model
 */
exports.reset=(data,callback)=>{
        
    //calling the reset model
    model.reset(data,(err,result)=>{
        if(err){
            //sending the errors to controller to display
            callback(err,result);
        }
        else{
            //sending the result to controller with 0 errors
            callback(null,result);
        }
    })
}