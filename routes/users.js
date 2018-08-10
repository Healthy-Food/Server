var express = require('express');

var router = express.Router();
const UserController = require('../controllers/fb.js')
const routesFood = require('./food')
const {addFood,readAllFood,readOneFood,removeFood,update} = require('../controllers/user')


router.use('/food',routesFood)

router.post('/loginfb',UserController.loginFb)




router.get('/home',readAllFood)
router.post('/home',addFood)
router.get('/home/:id',readOneFood)
router.delete('/home/:id',removeFood)
router.put('/home/:id',update)


module.exports = router;
