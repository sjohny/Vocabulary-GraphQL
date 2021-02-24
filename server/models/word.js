const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  likes: { type: Number, default: 0 },
  english: { type: String },
  svenska: { type: String }
});

WordSchema.statics.like = function(id) {
  const Word = mongoose.model('word');

  return Word.findById(id)
    .then(word => {
      ++word.likes;
      return word.save();
    })
}

mongoose.model('word', WordSchema);
