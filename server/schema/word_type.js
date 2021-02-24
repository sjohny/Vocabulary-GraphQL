const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Word = mongoose.model('word');

const WordType = new GraphQLObjectType({
  name:  'WordType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    english: { type: GraphQLString },
    svenska: { type: GraphQLString },
    category: {
      type: require('./category_type'),
      resolve(parentValue) {
        return Word.findById(parentValue).populate('category')
          .then(word => {
            console.log(word)
            return word.category
          });
      }
    }
  })
});

module.exports = WordType;
