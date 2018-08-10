const Model = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10;
const nodemailer = require('nodemailer');
const fs = require('fs')
let email = fs.readFileSync('./home.html','utf8')

const signUp = (req, res) => {
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.body.password, salt);
    Model.findOne({
        email : req.body.email
    })
    .then(dataUser=>{
        if(!dataUser){
          
            let { username, email} = req.body
            Model.create({
                username: username,
                password: hash,
                email: email,
            })
                .then(function (data) {
                    let token = jwt.sign({ username: data.username, email: data.email }, 'secretkey')
                    res.status(200).json({ msg: 'new user added', data :data,token})

                    // let transporter = nodemailer.createTransport({
                    //     service: 'gmail',
                    //     secure: false,
                    //     port: 25,
                    //     auth: {
                    //       user: 'odirobbani@gmail.com',
                    //       pass: `${process.env.passEmail}`
                    //     },
                    //     tls: {
                    //       rejectUnauthorized: false
                    //     }
                    //   });
                      
                    //   let HelperOptions = {
                    //     from: '"healthy food" <odirobbani@gmail.com',
                    //     to: `${data.email}`,
                    //     subject: 'Healthy Food',
                    //     text: `THANKS ${userName}FOR JOIN WITH US!!! `,
                    //     html: email,
                    //     attachments: [{   
                    //         // filename: 'wheresthegig.jpg',
                    //         //content: fs.createReadStream('/home/khodi/Documents/hacktiv8/wheres-the-gig/wtg.png')
                    //     }]
                    //   };
                       
                    //     transporter.sendMail(HelperOptions, (error, info) => {
                    //       if (error) {
                    //         return console.log(error);
                    //       }
                    //       console.log("The message was sent!");
                    //       console.log(info);
                    //     });
                      

                })
                .catch(function (err) {
                    res.status(500).json({ msg: 'add user failed' })
                })
        }else{
            res.json({msg : 'email has already taken'})
        }
    })
    .catch(err=>{
        res.json(err)
    })
   

}

const signIn = (req, res) => {
    Model.findOne({
        email: req.body.email
    })
    .then(function (user) {
        console.log(user)
            if (user) {
                let token = jwt.sign({ username: user.username,email: user.email }, 'secretkey')
                let decodedPass = bcrypt.compareSync(req.body.password, user.password)
                if (decodedPass) {
                    res.status(201).json({ token,user })
                } else {
                    res.status(400).json({ msg: "password/username is wrong" })
                }
            } else {
                res.status(400).json({ msg: "username/password not exist" })
            }
    })
    .catch(err=>{
            res.json(err)
        })
}

module.exports = { signUp, signIn}