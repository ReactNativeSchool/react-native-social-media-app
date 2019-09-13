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
    responses(_id: String): [Status]
  }
`;

const resolvers = {
  Query: {
    feed: () => require("./data").FEED,
    responses: (parent, args) => {
      return require("./data").RESPONSES.filter(
        item => item.parentId === args._id
      );
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
