const nodemailer = require('nodemailer');
const fs = require('fs')
let email = fs.readFileSync('./home.html','utf8')

function mailer(userMail,userName){

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: 'odirobbani@gmail.com',
      pass: `${process.env.passEmail}`
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  let HelperOptions = {
    from: '"healthy food" <odirobbani@gmail.com',
    to: `${userMail}`,
    subject: 'Healthy Food',
    text: `THANKS ${userName}FOR JOIN WITH US!!! `,
    html: email,
    attachments: [{   
        // filename: 'wheresthegig.jpg',
        //content: fs.createReadStream('/home/khodi/Documents/hacktiv8/wheres-the-gig/wtg.png')
    }]
  };
  
  
  
    transporter.sendMail(HelperOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("The message was sent!");
      console.log(info);
    });
  
}

module.exports = mailer