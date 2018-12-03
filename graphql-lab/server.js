const express = require('express');
const expressGraphql = require('express-graphql');

const app = express();

app.use('/graphql', expressGraphql({
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Listening port 4000');
});