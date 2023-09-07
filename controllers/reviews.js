const Music = require('../models/music');

module.exports = {
  create,
  
  delete: deleteReview
};

async function deleteReview(req, res) {
 
  const music = await Music.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
 
  if (!music) return res.redirect('/musics');
 
  music.reviews.remove(req.params.id);

  await music.save();

  res.redirect(`/musics/${music._id}`);
}

async function create(req, res) {
  const music = await Music.findById(req.params.id);


  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;


  music.reviews.push(req.body);
  try {

    await music.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/musics/${music._id}`);
}
