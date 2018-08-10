// const routes = require('express').Router()
// const routesUser = require('./users')
var express = require('express');
var routes = express.Router();
const {signUp,signIn} = require('../controllers/index') 


// routes.use('/users',routesUser)

routes.post('/signup', signUp)
routes.post('/signin', signIn)

module.exports = routes;
