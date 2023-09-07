const express = require('express');
const router = express.Router();

const musicsCtrl = require('../controllers/musics');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /musics
router.get('/', musicsCtrl.index);
// GET /musics/new
router.get('/new', ensureLoggedIn, musicsCtrl.new);
// GET /musics/:id/edit (move this above the /musics/:id route)
router.get('/:id/edit', ensureLoggedIn, musicsCtrl.edit);
router.put('/:id', ensureLoggedIn, musicsCtrl.update);
// GET /musics/:id (keep this here)
router.get('/:id', musicsCtrl.show);
// POST /musics
router.post('/', ensureLoggedIn, musicsCtrl.create);
router.delete('/:id', musicsCtrl.delete);

	
module.exports = router;
