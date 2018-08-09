const Model = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const request = require('request')

const signUp = (req, res) => {
    let { username, password, email, role } = req.body
    Model.create({
        username: username,
        password: password,
        email: email,
        role: role
    })
        .then(function (data) {
            res.status(201).json({ msg: 'new user added', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'add user failed' })
        })
}

const signIn = (req, res) => {
    Model.findOne({
        email: req.body.email
    })
        .then(function (user) {
            console.log(user);
            console.log(req.body);
            if (user) {
                let token = jwt.sign({ username: user.username, role: user.role, email: user.email }, 'secretkey')
                let decodedPass = bcrypt.compare(req.body.password, user.password)
                if (decodedPass) {
                    res.status(201).json({ token })
                } else {
                    res.status(400).json({ msg: "password/username is wrong" })
                }
            } else {
                res.status(400).json({ msg: "username/password not exist" })
            }
        })
}

module.exports = { signUp, signIn}