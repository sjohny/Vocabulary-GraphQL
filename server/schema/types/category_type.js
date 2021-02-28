const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const WordType = require('./word_type');
const Category = mongoose.model('category');

const CategoryType = new GraphQLObjectType({
  name:  'CategoryType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    words: {
      type: new GraphQLList(WordType),
      resolve(parentValue) {
        return Category.findWords(parentValue.id);
      }
    }
  })
});

module.exports = CategoryType;
