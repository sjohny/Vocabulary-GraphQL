const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Category = mongoose.model('category');
const Word = mongoose.model('word');
const CategoryType = require('./category_type');
const WordType = require('./word_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCategory: {
      type: CategoryType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Category({ title })).save()
      }
    },
    addWordToCategory: {
      type: CategoryType,
      args: {
        english: { type: GraphQLString },
        svenska: { type: GraphQLString },
        categoryId: { type: GraphQLID }
      },
      resolve(parentValue, { english, svenska, categoryId }) {
        return Category.addWord(categoryId, english, svenska);
      }
    },
    likeWord: {
      type: WordType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Word.like(id);
      }
    },
    deleteCategory: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Category.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
