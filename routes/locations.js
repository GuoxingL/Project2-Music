const express = require('express');
const router = express.Router();
const locationsCtrl = require('../controllers/locations');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// This router is mounted to a "starts with" path of '/'

// GET /locations/new (new functionality)
router.get('/locations/new', ensureLoggedIn, locationsCtrl.new);
// POST /locations (create functionality)
router.post('/locations', ensureLoggedIn, locationsCtrl.create);
// POST /musics/:id/locations (associate a location with a music)
router.post('/muisics/:id/locations', ensureLoggedIn, locationsCtrl.addToLocation);

module.exports = router;