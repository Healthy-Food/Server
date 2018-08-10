const routes = require('express').Router()
const routesUser = require('./users')
const {signUp,signIn} = require('../controllers/index') 


routes.use('/users',routesUser)

routes.post('/signup', signUp)
routes.post('/signin', signIn)

module.exports = routes;
