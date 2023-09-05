const Music = require('../models/music');

module.exports = {
  create,
  
  delete: deleteReview
};

async function deleteReview(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const music = await Music.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
  // Rogue user!
  if (!music) return res.redirect('/musics');
  // Remove the review using the remove method available on Mongoose arrays
  music.reviews.remove(req.params.id);
  // Save the updated music doc
  await music.save();
  // Redirect back to the music's show view
  res.redirect(`/musics/${music._id}`);
}

async function create(req, res) {
  const music = await Music.findById(req.params.id);

  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  music.reviews.push(req.body);
  try {
    // Save any changes made to the music doc
    await music.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/musics/${music._id}`);
}
