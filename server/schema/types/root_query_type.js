const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const CategoryType = require('./category_type');
const WordType = require('./word_type');
const UserType = require('./user_type');
const Word = mongoose.model('word');
const Category = mongoose.model('category');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve() {
        return Category.find({});
      }
    },
    category: {
      type: CategoryType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Category.findById(id);
      }
    },
    word: {
      type: WordType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Word.findById(id);
      }
    }
  })
});

module.exports = RootQueryType;
