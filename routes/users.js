var express = require('express');
var router = express.Router();
const UserController = require('../controllers/fb.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/loginfb',UserController.loginFb)


module.exports = router;
