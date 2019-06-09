
/**
 * express getting express package to variable "express"
 */
const express=require('express');
/**
 * @param           {bodyParser}
 * 
 * @description     getting the package to variable " bodyParser"
 */
const bodyParser=require("body-parser");

require('dotenv').config();
//loading mongoose package
const mongoose=require('mongoose');
//importing router from route.js in routes 
const route=require('../serverSide/routes/route')
//loading express-validator package
const expressValidator=require('express-validator');
//loading all the express functions to app
const app=express();
//it is used to read the data to json formate
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
//using express validator throught the function
app.use(expressValidator());
app.use('/',route)

// connecting the to mongo
const dbConfig=require('./config/config')
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
/**
 *  DeprecationWarning: Mongoose: findOneAndUpdate() and findOneAndDelete() without 
 * the useFindAndModify option set to false are deprecated. 
 */
// to avoid the above warning while use findOneAndUpdate query
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//localhost setting to port 3000
const port=process.env.PORT


//starting the server 
var server=app.listen(port,()=>{
    console.log("server is up at "+port);

})

module.exports=server;