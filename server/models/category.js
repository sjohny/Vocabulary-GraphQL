const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  words: [{
    type: Schema.Types.ObjectId,
    ref: 'word'
  }]
});

CategorySchema.statics.addWord = function(id, english, svenska) {
  const Word = mongoose.model('word');

  return this.findById(id)
    .then(category => {
      const word = new Word({ english, svenska, category })
      category.words.push(word)
      return Promise.all([word.save(), category.save()])
        .then(([word, category]) => category);
    });
}

CategorySchema.statics.findWords = function(id) {
  return this.findById(id)
    .populate('words')
    .then(category => category.words);
}

mongoose.model('category', CategorySchema);
