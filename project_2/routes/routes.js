const express = require('express');
const passport = require('passport');
const router = express.Router();

//Swagger
router.use('/', require('./swagger'))

//Swagger: /users
router.use('/users', require('./users'))
//Swagger: /teams
router.use('/teams', require('./team'))

//Other routes
router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', function(req, res, next){
    req.logout(function(err){
        if(err) {return next(err);}
        res.redirect('/')
    })
})

module.exports = router;