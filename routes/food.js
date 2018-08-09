var express = require('express');
var routes = express.Router();
const routesIngredient = require('./ingredient')
const {addIngredient,readAllIngredient,readOneIngredient,removeIngredient,update} = require('../controllers/food')

routes.use('/ingredient',routesIngredient)

routes.get('/',readAllIngredient)
routes.post('/',addIngredient)
routes.get('/:id',readOneIngredient)
routes.delete('/:id',removeIngredient)
routes.put('/:id',update)


module.exports = routes;