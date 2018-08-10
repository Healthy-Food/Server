const Model = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10;

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