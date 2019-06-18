/**
 * @param       {mongoose}
 * 
 * @description loading mongoose package
 */
const mongoose = require('mongoose');
/**
 * @param       {bcrypt}
 * 
 * @description loading bycrpt package
 */
const bcrypt = require('bcrypt');
/**
 * @param           {jwt}
 * @description     loading jsonwebtoken package
 */
const jwt = require('jsonwebtoken')
/**
 * @param       {nodemailer}
 * 
 * @description     getting the package to semd mail to verify the user
 */

const nodemailer = require('../../nodemailer/sendMail')
/**
 * @param       {fundoo}
 * 
 * @description writting the mongodb schema using mongoose
 */

const fundoo = mongoose.Schema({
    /**
     * @param       {name}
     * 
     * @description saving the user name to database
     */
    name: {
        type: String,
        required: [true, "name is required"]
    },
    /**
    * 	"isVerified" : true,

    * 	"isVerified" : true,

    * 	"isVerified" : true,
 user email to database
    */	"isVerified": true,

    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email should unique"]
    },
    /**
    * @param       {password}
    * 
    * @description saving the user password to dabase for login
    */
    password: {
        type: String,
        required: [true, "password is required"]
    },

    isVerified: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: true
    }
);
/**
 * @param       {fun}
 * 
 * @description making the mongoose mnodel to save the collection  in database
 */
var fun = mongoose.model('users', fundoo);

var redis = require('redis');

var client = redis.createClient();
client.on("error", function (err) {
    console.log("error " + err);

})
/**
 * @function        register
 * 
 * @description     this function is used to save the user data into  mongodb
 *                      before saving the data it verifies the user email  
 */
module.exports.register = (body, callback) => {


    // checking the user entered email already exist in database 
    fun.findOne({ "email": body.email }, (err, result) => {
        if (result) {
            //console.log(res);
            callback("user Already Registered  as " + result.name, result);
        }
        // if not present save the user data into database
        else {
            //hashing the password
            body.password = bcrypt.hashSync(body.password, parseInt(process.env.SALTROUNDS));
            //console.log("body.password", body.password)

            let token = jwt.sign(body, process.env.SECRETKEY);
            console.log(token);

            let link = 'http://localhost:3000/#!/registerVerify';
            let payload = { "email": body.email };

            nodemailer.sendMail(link, token, payload, (err, result) => {
                if (err) {
                    //console.log(err);
                    callback("err in sending the mail" + err, result)
                }
                else {
                    callback(null, "verification link is sent to your mail");
                }
            })
            const newuser = new fun({
                "email": body.email,
                "name": body.name,
                "password": body.password
            });

            // console.log(body.password)

            //saving the user to database
            newuser.save((err, result) => {
                if (err) {
                    console.log("err in inserting");
                    callback(err, result)
                }
                else {
                    console.log("Registeration sucessfull");
                    callback(null, result);

                }
            })
        }
    })
    // console.log("register model callback");

}
/**
 * @function        saveUser
 * 
 * @description     used to verify the user
 */
exports.saveUser = (body, callback) => {
    console.log(body);

    fun.updateOne({ "email": body.payload.email }, { $set: { "isVerified": true } }, (err, resul) => {
        if (err) {
            console.log("error in verify Model " + err);
            callback("cannot update", err);
        }
        else {
            callback(null, "user vesrification sucessfull")
        }
    })
}
/**
 * @function        login
 * 
 * @description     this functin to check the user entered email and password 
 *                  is correct or not if correct it allows to login else rejects 
 */
exports.login = (body, callback) => {
    //findOne function finds only one present in database with entered 
    //email and password
    fun.findOne({ "email": body.email }, (err, result) => {
        if (err) {
            callback(err, result);
        }
        if (!result) {
            return callback(null, "invalid email ");
        }


        else {


            bcrypt.compare(body.password, result.password, (error, res) => {
                if (error) {


                    return callback("invalid password", res);
                }
                else {
                    // console.log("\n\n\n\n\n"+res+"\n\n\n\n");
                    if (!res) {
                        console.log(res);
                        return callback("invalid password");
                    }
                    //saving the result in object 
                    var result1 = {
                        "name": result.name,
                        "email": result.email,
                        "password": result.password
                    }
                    // console.log(result1);


                    //    var token=jwt.sign(result1,process.env.SECRETKEY);

                    //storing the user details in the redis 
                    client.hmset(body.email,result1)
                    // console.log("\n\n\n"+result+"\n\n\n");

                    return callback(null, "logged in as " + result.name);
                }
            }
            );
            //callback("invalid email or password");
        }
    })
}
/**
 * @function           
 */
exports.forgotPassword = (body, callback) => {


    fun.findOne({ "email": body.email }, (err, result) => {
        if (!result) {
            console.log(err);
            callback("email not found", result);
        }
        else {

            let token = jwt.sign(body, process.env.SECRETKEY);
            console.log(token);
            callback(null, token);


        }
    })
}

/**
 * @function        reset
 * 
 * @description     function is used to update the user password
*/
exports.reset = (body, callback) => {
    //finding the user entered email and updating the password
    body.updatePassword = bcrypt.hashSync(body.updatePassword, parseInt(process.env.SALTROUNDS));

    fun.findOneAndUpdate({ "email": body.payload.email }, { $set: { "password": body.updatePassword } }, { new: true }, (err, result) => {
        if (err) {
            console.log(err);

            callback("update failed", result);
        }
        else {
            callback(null, "password update sucessful")
        }
    })
}