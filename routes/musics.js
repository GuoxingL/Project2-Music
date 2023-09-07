const express = require('express');
const router = express.Router();

const musicsCtrl = require('../controllers/musics');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /musics
router.get('/', musicsCtrl.index);
// GET /musics/new
router.get('/new', ensureLoggedIn, musicsCtrl.new);
// GET /musics/:id 
router.get('/:id', musicsCtrl.show);
// POST /musics
router.post('/', ensureLoggedIn, musicsCtrl.create);
router.delete('/:id', musicsCtrl.delete);
router.get('/musics/:id/edit', ensureLoggedIn, musicsCtrl.edit);
	
module.exports = router;
