const router = require('express').Router();
const passport = require('passport');


router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});


router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'),(req, res) => {
    console.log(req.params)
    res.send('homepage user');
});

module.exports = router;