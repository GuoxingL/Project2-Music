var express = require('express');
var router = express.Router();
const passport = require('passport');

// This app has no "home" page, but your projects should 😀
router.get('/', function(req, res, next) {
  res.redirect('/musics');
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
 
  'google',
  {
    // Requesting the user's profile and email
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
