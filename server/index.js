const { ApolloServer } = require("apollo-server");
const jwt = require("jsonwebtoken");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const config = require("./config");
const db = require("./db");

const validateTokenAndGetUserId = (token) => {
  try {
    const { _id } = jwt.verify(token, config.JWT_SECRET);
    // Check the db to make sure they're still a user
    const user = db.get("users").find({ _id }).value();
    return user._id;
  } catch {
    // Something bad happened so we can't validate the user;
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const context = {};

    if (req.headers.authorization) {
      // Bearer SOME_TOKEN
      const [, token] = req.headers.authorization.split(" ");
      context.userId = validateTokenAndGetUserId(token);
    }

    return context;
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}!`);
});
