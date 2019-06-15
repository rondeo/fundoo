/**
 * @param           {service}
 * @description     getting the services 
 */
const service=require('../services/userservice');
/**
 * @function            register
 * 
 * @description         used to validate the user data from server side and
 *                      calling the service register
 * 
 @returns               {res} 
 */

 var redis=require('redis');
 var client=redis.createClient();
 client.on("error ",function(err){
     console.log("error "+err);
     
 })


exports.register=(req,res)=>{
  
    
        //validating the data
        //validatind the email
        req.checkBody('email','invalid email').isEmail();
        //validating the name it should contain atleast 3 letters 
        req.checkBody('name','invalid name').isLength({min:3}).isAlpha();
        //password should have atleast 8 characters
        req.checkBody('password','invalid Password').isLength({min:8});
        var errors = req.validationErrors();       
        //display the errors  
        if(errors)
        {
           
            
            console.log(errors[0].msg);
            
            res.send(errors[0].msg);
        }
        else{
            //calling the service
    service.register(req.body,(err,result)=>{
        if(err)
        {
            
            console.log((err));
            
            res.send(err);    
            

        }
        else{
           // console.log("Registeration Successfull");
            
            res.send("Registeration Successfull")
        }
        
    })
}
}
/**
 * @function            saveUser
 * 
 * @description         used to store the user data after verification
 */
exports.saveUser=(req,res)=>{


    service.saveUser(req.body,(err,result)=>{

        if(err){
            console.log(err);
            
        }
        else{
            console.log("user Verified sucessfully");
            
            res.send("User Verified Sucessfully");
        }
    })
}

/**
 * @function            login
 * 
 * @description         used to validate the user data from server side and
 *                      calling the service login
 * 
 @returns               {res} 
 */
exports.login=(req,res)=>{
    
    //validating the user data
    // validating the user email
    req.checkBody('email','invalid email').isEmail();
    //validating the user password
    req.checkBody('password','invalid password').isLength({min:8});
    
    var errors=req.validationErrors();
    //displaying the errors
    if(errors){
        console.log(errors[0].msg);
        res.send(errors[0].msg);
       
        
    }
    else{
        //calling the login service
        client.exists(req.body.email,function(err,reply){
            if(err){
                console.log(err);
                
            }
            else{
                console.log(reply);
                
                if(reply){
              res.send("user already logged in ")
                }
                else{
                    service.login(req.body,(err,result)=>{  
                        if(err)
                        {
                            res.send("error "+err);
                        }
                        else{
                            console.log(result);
                            
                            res.send(result);
                        }
                    })
                }
            }
        })
        client.get(req.body.email,function(err,reply){
            if(err){
                console.log(err);
                
            }
            else{
                console.log(reply);
                
            }
        })
       
    }
}
/**
 * @function            forget
 * 
 * @description         used to validate the user data from server side and
 *                      calling the service forget
 */
exports.forgotPassword=(req,res)=>{

    console.log("forget controller");
    
    service.forgotPassword(req.body,(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    })

}
/**
 * @function            reset
 * 
 * @description         used to validate the user data from server side and
 *                      calling the service reset
 * 
 @returns               {res} 
 */
exports.reset=(req,res)=>{

    //validating the entered email is valid or not
    // req.checkBody('email','invalid email').isEmail();
    req.checkBody('updatePassword','invalid password').isLength({min:8});
    var errors=req.validationErrors();
    //displaying the errors
    if(errors){
        console.log(errors[0].msg);
        res.send(errors[0].msg);
    }
    else{
        //calling the reset service
        service.reset(req.body,(err,result)=>{
            if(err){
                console.log(err);
                res.send("error "+err);
                
            }
            else{
                res.send(result);
            }
        })
    }
}