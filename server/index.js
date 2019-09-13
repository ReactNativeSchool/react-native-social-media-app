const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Status {
    _id: String
    avatarUri: String
    name: String
    username: String
    status: String
    mediaUri: String
    isLiked: Boolean
    publishedAt: String
  }

  type Query {
    feed: [Status]
  }
`;

const resolvers = {
  Query: {
    feed: () => require("./data").FEED
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
