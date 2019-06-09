var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'gchakravarthia8@gmail.com',
           pass: '7899590744'
       }
   });
   const mailOptions = {
    from: 'gchakravarthia8@gmail.com', // sender address
    to: 'dhenurithu.97@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    message: 'Hi'// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });