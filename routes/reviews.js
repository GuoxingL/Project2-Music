const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /musics/:id/reviews 
router.post('/musics/:id/reviews', ensureLoggedIn, reviewsCtrl.create);
// DELETE /reviews
router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);
router.delete('/musics/:id/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;

