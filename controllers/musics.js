const Music = require('../models/music');

module.exports = {
  index,
  show,
  new: newMusic,
  delete: deleteMusic,
  create,
  edit
};

async function index(req, res) {
  try {
    const musics = await Music.find({});
    res.render('musics/index', { title: 'All Musics', musics });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

async function show(req, res) {
  try {
    const music = await Music.findById(req.params.id);
    if (!music) {
      return res.status(404).send('Music not found');
    }
    res.render('musics/show', { title: 'Music Detail', music });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

async function deleteMusic(req, res) {
  try {
    const music = await Music.findByIdAndDelete(req.params.id);
    if (!music) {
      return res.status(404).send('Music not found');
    }
    res.redirect('/musics');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

function newMusic(req, res) {
  res.render('musics/new', { title: 'Add Music', errorMsg: '' });
}

async function create(req, res) {
  try {
    const newMusic = await Music.create(req.body);
    res.redirect(`/musics/${newMusic._id}`);
  } catch (err) {
    console.error(err);
    res.render('musics/new', { title: 'Add Music', errorMsg: err.message });
  }
}

async function edit(req, res) {
  try {
    const music = await Music.findById(req.params.id);
    if (!music) {
      return res.status(404).send('Music not found');
    }
    res.render('musics/edit');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}