const Location = require('../models/location');
const Music = require('../models/music');

module.exports = {
  new: newlocation,
  create,
  addToLocation,
  delete:deleteLocation
 
};

async function addToLocation(req, res) {
  const music = await Music.findById(req.params.id);
 
  music.cast.push(req.body.locationId);
  await music.save();
  res.redirect(`/musics/${music._id}`);
}

async function newlocation(req, res) {
  const locations = await Location.find({}).sort('');
  res.render('locations/new', { title: 'Add Location', locations, location: {} });
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



async function deleteLocation(req, res) {
  try {
    console.log('Deleting location with ID:', req.params.id);

    const location = await Location.findByIdAndDelete(req.params.id);
    console.log('Deleted location:', location);

    if (!location) {
      return res.status(404).send('Location not found');
    }

    // Render the same page with a success message
    const locations = await Location.find({}).sort('');
    res.render('locations/new', {
      title: 'Add Location',
      locations,
      location: {},
      successMessage: 'Location deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}
