var express = require('express');
var routes = express.Router();
const routesFood = require('./food')
const {addFood,readAllFood,readOneFood,removeFood,update} = require('../controllers/user')

routes.use('/food',routesFood)

routes.get('/home',readAllFood)
routes.post('/home',addFood)
routes.get('/home/:id',readOneFood)
routes.delete('/home/:id',removeFood)
routes.put('/home/:id',update)


module.exports = routes;
