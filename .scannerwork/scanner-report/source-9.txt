/**
 * @param           {jwt}
 * @description     loading the jsonwebtoken 
 */
const jwt = require('jsonwebtoken')
/**
 * @function        authentication
 * 
 * @description     USED TO VERIFY THE TOKEN 
 */
exports.authentication = (req,res,next) => {
   console.log("autho");
   
    console.log("response.body",req.body)
    console.log("headers",req.headers)
    var token = req.header('token');
    console.log(token)
    if (token != null) {
        //verifying the token
        jwt.verify(token,process.env.SECRETKEY,(err, payload) => {
            let responseResult = {}

            if (err) {
                console.log("in auth err")
                responseResult.err = err;
                responseResult.status = false;
                res.status(500).send(responseResult)
                //next(responseResult);
            }
            else {
                console.log("in auth payload")
                req.body.payload= payload;
                console.log(req.body.payload)
                console.log("authentication token successful",payload);
                next();
            }
        })
    }
    else {
        res.status(500).send({
            success: false,
            message: 'No token provided.'
            
        });
    }
}