const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const musicsCtrl = require('../controllers/musics');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /musics
router.get('/', musicsCtrl.index);
// GET /musics/new
router.get('/new', ensureLoggedIn, musicsCtrl.new);
// GET /musics/:id (show functionality) MUST be below new route
router.get('/:id', musicsCtrl.show);
// POST /musics
router.post('/', ensureLoggedIn, musicsCtrl.create);
router.delete('/:id', musicsCtrl.delete);
	
module.exports = router;
