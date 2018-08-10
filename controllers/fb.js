const axios = require('axios');
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

class Controller{

    static loginFb(req,res){
        let token = req.body.headers.tokenFb
        let url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
        axios.get(url)
        .then(data=>{
            User.findOne({
                email : data.data.email
            })
            .then(mail=>{
                if(!mail){
                    User.create({
                        username : data.data.name,
                        email : data.data.email,
                        password : data.data.id
                    })
                    .then(dataUser=>{
                        console.log(dataUser)
                        let token = jwt.sign({ username: user.username, email: user.email }, 'secretkey')
                        res.json({dataUser,token})
                    })
                    .catch(err=>{
                        res.json(err)
                    })
                }else{
                    res.json('email has already taken')
                }
            })
            .catch(err=>{
                res.json(err)
            })
        })
        .catch(err=>{
            res.json(err)
        })
    }

}
module.exports = Controller