const Music = require('../models/music');
// const Location = require('../models/location');

module.exports = {
  index,
  show,
  new: newMusic,
  delete:deleteMusic,
  create
};

async function index(req, res) {
  const musics = await Music.find({});
  res.render('musics/index', { title: 'All Musics', musics });
}

async function show(req, res) {
  
  const music = await Music.findById(req.params.id)

  // const locations = await Location.find({ _id: { $nin: music.cast } }).sort('name');
  res.render('musics/show', { title: 'Music Detail', music });
}

async function deleteMusic(req, res) {
  try {
    const music = await Music.findByIdAndDelete(req.params.id);
    if (!music) {
      // Handle the case where the music was not found
      return res.redirect('/musics');
    }
    console.log(music);
    res.redirect('/musics');
  } catch (err) {
    // Handle any errors that occurred during the deletion
    console.error(err);
    res.redirect('/musics');
  }
}

function newMusic(req, res) {

  res.render('musics/new', { title: 'Add Music', errorMsg: '' });
}

async function create(req, res) {
  console.log(req.body)

  // req.body.nowShowing = !!req.body.nowShowing;
  
  // for (let key in req.body) {
  //   if (req.body[key] === '') delete req.body[key];
  // }
  try {
    await Music.create(req.body);
    
    res.redirect(`/musics/`);
  } catch (err) {
    
    console.log(err);
    res.render('musics/new', { errorMsg: err.message });
  }
}