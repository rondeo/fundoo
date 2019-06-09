const model=require('../app/modules/module');

exports.register=(data,callback)=>{
 
    
    model.register(data,(err,result)=>{
        if(err)
        {
            //console.log("error in services");
            callback(err,result);    
        }
        else{
            callback(null,result);
        }
        
    })
}

exports.login=(data,callback)=>{

    model.login(data,(err,result)=>{
        if(err)
        {
            callback(err,result)
        }
        else{
            callback(null,result)
        }
    })
}
exports.reset=(data,callback)=>{
    model.reset(data,(err,result)=>{
        if(err){
            callback(err,result);
        }
        else{
            callback(null,result);
        }
    })
}