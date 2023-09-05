const Music = require('../models/music');
const Location = require('../models/location');

module.exports = {
  index,
  show,
  new: newMusic,
  create
};

async function index(req, res) {
  const musics = await Music.find({});
  res.render('musics/index', { title: 'All Musics', musics });
}

async function show(req, res) {
  
  const music = await Music.findById(req.params.id).populate('location');

  const locations = await Location.find({ _id: { $nin: music.cast } }).sort('name');
  res.render('musics/show', { title: 'Music Detail', music, locations });
}

function newMusic(req, res) {

  res.render('musics/new', { title: 'Add Music', errorMsg: '' });
}

async function create(req, res) {
  
  req.body.nowShowing = !!req.body.nowShowing;
  
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    
    const Music = await Music.create(req.body);
    
    res.redirect(`/musics/${music._id}`);
  } catch (err) {
    
    console.log(err);
    res.render('musics/new', { errorMsg: err.message });
  }
}