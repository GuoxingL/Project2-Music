const express = require('express');
const router = express.Router();
const locationsCtrl = require('../controllers/locations');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /locations/new
router.get('/locations/new', ensureLoggedIn, locationsCtrl.new);

// POST /locations
router.post('/locations', ensureLoggedIn, locationsCtrl.create);

// POST /musics/:id/locations (assuming "musics" is correct)
router.post('/musics/:id/locations', ensureLoggedIn, locationsCtrl.addToLocation);

// DELETE /locations/:id (assuming this should delete a specific location)
router.delete('/locations/:id', ensureLoggedIn, locationsCtrl.delete);

module.exports = router;
