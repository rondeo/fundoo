var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

// creating the new instance of s3
  var s3 = new aws.S3({})
try{
    // setting the configuration to asw-s3
  aws.config.update({
    // these are provided in the aws security credentials
    secretAccessKey:'AKIAII4HS5WSMTAJK4LQ',
    accessKeyId:'100/tdeMdXL1auIrBg9P7CoieEoCRLBcuFPyQkY/',
    region:'Asis Pacific(Mumbai)'//optional
  })
  //multer is middleware used to upload the file
  var upload = multer({
     
   
    storage: multerS3({
      s3: s3,
      bucket: 'fundoo-notes',//my bucket name in aws-s3
      acl: 'public-read',//access options
      //callback function to set the metedata of uploadfiles
      metadata: function (_req, file, callback) {
          console.log("in metadata");
          
        callback(null, file);
      },
      //callback function to set the key property
      key: function (_req, _file, callback) {
          console.log("in key function");
          // key property is current date
        callback(null, Date.now().toString())
      }
    })
  })
}catch(err){
  console.log(err);
  
}

//
module.exports = upload;