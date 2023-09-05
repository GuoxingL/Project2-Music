const Location = require('../models/location');
const Music = require('../models/music');

module.exports = {
  new: newlocation,
  create,
  addToLocation
};

async function addToLocation(req, res) {
  const music = await Music.findById(req.params.id);
  // The location array holds the location's ObjectId (referencing)
  music.cast.push(req.body.locationId);
  await music.save();
  res.redirect(`/musics/${music._id}`);
}

async function newlocation(req, res) {
  //Sort locations by their music
  const locations = await Location.find({}).sort('name');
  res.render('locations/new', { title: 'Add Location', locations });
}

async function create(req, res) {

  req.body.born += 'T00:00';
  try {
    await Location.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/locations/new');
}