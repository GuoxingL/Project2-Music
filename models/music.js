const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const musicSchema = new Schema({
  title: { type: String, required: true },
  releaseYear: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
    min: 1927
  },
  style: {
    type: String,
    enum: ['Pop', 'Rock', 'Hip-hop/Rap', 'Country','Jazz','Classical']
  },
  singer:{
    type:String,
    require:true

  },
  quotes:{
    type: String,
    required: true
  },
  // location: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Location'
  // }],
  nowShowing: { type: String, default: 'true' },
  reviews: [reviewSchema]
}, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Music', musicSchema);