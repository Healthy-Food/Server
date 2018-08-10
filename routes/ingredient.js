var express = require('express');
var routes = express.Router();
const {addNutrition,readAllNutrition,readOneNutrition,removeNutrition,update} = require('../controllers/ingredient')

routes.get('/nutrition',readAllNutrition)
routes.post('/nutrition',addNutrition)
routes.get('/nutrition/:id',readOneNutrition)
routes.delete('/nutrition/:id',removeNutrition)
routes.put('/:id',update)


module.exports = routes;