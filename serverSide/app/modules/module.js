const mongoose=require('mongoose');

const fundoo=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }},{
       timestamps:true 
    }
);

var fun=mongoose.model('users',fundoo);


module.exports.register=(body,callback)=>{

    
    fun.findOne({"email":body.email},(err,result)=>{
        if(result){
            //console.log(res);
            callback("user Already exist ",result.name);
        }
        else
        {
            const newuser=new fun({
                "email":body.email,
                "name":body.name,
                "password":body.password           
            });
            newuser.save((err,result)=>{
                if(err)
                {
                    console.log("err in inserting");
                    callback(err,result)
                }
                else{
                    console.log("Registeration sucessfull");
                    callback(null,result);
                    
                }
            })
        }
    })
}
exports.login=(body,callback)=>{
    fun.findOne({"email":body.email,"password":body.password},(err,result)=>{
        if(result){
            callback(null,"loged in as "+result.name);
        }
        else{
            callback("invalid email or password");
        }
    })
}

exports.reset=(body,callback)=>{
    fun.findOneAndUpdate({"email":body.email},{$set:{"password":body.updatePassword}},{new :true},(err,result)=>{
        if(err){
            console.log(err);
            
            callback("update failed",result);
        }
        else{
            callback(null,"password update sucessful")
        }
    })
}