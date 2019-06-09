const service=require('../services/userservice');

exports.register=(req,res)=>{
  
        
        req.checkBody('email','invalid email').isEmail();
        req.checkBody('name','invalid name').isLength({min:3}).isAlpha();
        req.checkBody('password','invalid Password').isLength({min:8});
        var errors = req.validationErrors();        
        if(errors)
        {
           
            
            console.log(errors[0].msg);
            
            res.send(errors[0].msg);
        }
        else{
    service.register(req.body,(err,result)=>{
        if(err)
        {
            
            res.send("User Already Exitst  "+err);    
            

        }
        else{
            res.send("Registeration Successfull")
        }
        
    })
}
}

exports.login=(req,res)=>{
    req.checkBody('email','invalid email').isEmail();
    req.checkBody('password','invalid password').isLength({min:8});

    var errors=req.validationErrors();
    if(errors){
        console.log(errors[0].msg);
        res.send(errors[0].msg);
       
        
    }
    else{
        service.login(req.body,(err,result)=>{
            if(err)
            {
                res.send("error "+err);
            }
            else{
                res.send(result);
            }
        })
    }
}
exports.reset=(req,res)=>{

    req.checkBody('email','invalid email').isEmail();
    var errors=req.validationErrors();
    if(errors){
        console.log(errors[0].msg);
        res.send(errors[0].msg);
    }
    else{
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