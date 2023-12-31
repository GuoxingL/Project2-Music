var express = require('express');
var router = express.Router();
const passport = require('passport');


router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});


// Google OAuth login route
router.get('/auth/google', passport.authenticate(
 
  'google',
  {
    
    scope: ['profile', 'email'],
    
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/musics',
    failureRedirect: '/musics'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/musics');
  });
});

module.exports = router;
