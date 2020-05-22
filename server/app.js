const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();

//allow cross origin
app.use(cors());

const dbURL = process.env.GRAPHQL_MONGODB_URL;
mongoose.connect(dbURL, { useNewUrlParser: true });
mongoose.connection.once('open',() => {
  console.log('Connected to database...')
})

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4001,() => console.log('Listening on port 4001'));