const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')

const app = express();
const dbURL = process.env.GRAPHQL_MONGODB_URL;
mongoose.connect(dbURL, { useNewUrlParser:true });
mongoose.connection.once('open',() => {
  console.log('Connected to database...')
})

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4001,() => console.log('Listening on port 4001'));