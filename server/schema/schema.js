const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

//dummy data
var books = [
  {
    id: '1',
    name: "this is book 1",
    gener: "look",
    authorId: '1'
  },
  {
    id: '2',
    name: "this is book 2",
    gener: "look",
    authorId: '2'
  },
  {
    id: '3',
    name: "this is book 3",
    gener: "look",
    authorId: '1'
  },
  {
    id: '4',
    name: "this is book 3",
    gener: "look",
    authorId: '2'
  },
  {
    id: '5',
    name: "this is book 3",
    gener: "look",
    authorId: '3'
  },
  {
    id: '6',
    name: "this is book 3",
    gener: "look",
    authorId: '3'
  }
]

var authors = [
  {
    name: 'bharat p', age: 26, id: '1'
  },
  {
    name: 'Sagar p', age: 29, id: '2'
  },
  {
    name: 'Abhi p', age: 21, id: '3'
  },
  {
    name: 'vishal p', age: 26, id: '4'
  }
]

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gener: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, {id: parent.authorId})
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, {authorId: parent.id})
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLID }},
      resolve(parent, args) {
        return _.find(books, {id: args.id})
      }
    },
    author: {
      type: AuthorType,
      args: {id: { type: GraphQLID }},
      resolve(parent, args) {
        return _.find(authors, {id: args.id})
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});