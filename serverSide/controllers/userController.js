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

 const upload=require('../config/aws.s3');

const bcrypt = require('bcrypt');

 var redis=require('redis');

 const S3=require('aws-s3');

 var client=redis.createClient();
 client.on("error ",function(err){
     console.log("error "+err);
     
 })


exports.register=(req,res)=>{
  
    console.log(req);
    
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
     
        // getting the all the elements in object   
        client.hgetall(req.body.email,function(err,reply){
            // console.log("\n\n\n in client get function\n\n\n");
            
            //checking for error
            if(err){
                // console.log("\n\n\n"+err+"\n\n\n");
                console.log(err);
                res.send(err)
                
            }
            else{
                // console.log("\n\n\n"+reply+"\n\n\n");
                
                //if the email present in the redis cache
                if(reply){
                    // console.log(reply);
                    
                    // the bcrypt password with user entered password
                    bcrypt.compare(req.body.password,reply.password,(error,result)=>
                    {
                        // console.log("\n\n\n in controller bcrypt\n\n\n");
                        
                        console.log(reply);

                        if (error) {
                            
                            
                           // console.log(result);
                            
                          res.send("invalid password");

                        }
                        else {console.log(reply);
                            if(!result){

                             //console.log(result);
                             console.log("invalid password");
                             
                             res.send("invalid password");
                            }
                            else{
                                console.log(reply);
                                console.log("\n\nif true");
                                
                                //console.log("logged in as "+reply.name);
                                res.send("loged in as "+reply.name)
                            }

                    }})
                }
                else{
                    //if the user details not in redis
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
    //calling the services of forgotPassword
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


/**
 * @function        upload
 * 
 * @description     used to store the files in aws-s3 , this call the function upload
 *                   present in the aws.s3.js file 
 */
exports.upload= (req, res) => {
    /**
     * used to store the result
     */
    let responseResult = {}
  
    
    try{
        //copying the function to singleUpload variable 
        const singleUplaod = upload.single('image')
        //calling the function which is presentg in aws.se.js
        singleUplaod(req, res, function (err) {
    
            //checking for the errors 
            if (err) {
    
                console.log("error in controllers  "+err)
                responseResult.err = err;
                responseResult.status = false;
                res.status(500).send(responseResult)
    
            }
            // if no errors then the file is uploaded sucessfully
            else {
                res.send("uploaded sucessfully")
          
            }
        })
        
    }/**to handle the errors in the try block */catch(err){
        console.log(err);
        
        responseResult.err = err;
        responseResult.status = false;
        res.status(500).send(responseResult)
    }
}