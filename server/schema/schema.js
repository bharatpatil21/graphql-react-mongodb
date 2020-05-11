const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;

var books = [
  {
    id: '1',
    name: "this is book 1",
    gener: "look"
  },
  {
    id: '2',
    name: "this is book 2",
    gener: "look"
  },
  {
    id: '3',
    name: "this is book 3",
    gener: "look"
  }
]

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    gener: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLString }},
      resolve(parent, args) {
        return _.find(books, {id: args.id})
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});