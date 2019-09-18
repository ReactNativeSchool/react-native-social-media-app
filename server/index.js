const { ApolloServer } = require("apollo-server");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

// just for demo
const validateTokenAndGetUserId = token => "user-2";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const context = {};

    if (req.headers.authorization) {
      const [_, token] = req.headers.authorization.split(" ");
      context.userId = validateTokenAndGetUserId(token);
    }

    return context;
  }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
