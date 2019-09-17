const { ApolloServer, gql } = require("apollo-server");
const db = require("./db");

const typeDefs = gql`
  type User {
    _id: String
    avatarUri: String
    name: String
    username: String
  }

  type Status {
    _id: String
    userId: String
    user: User
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
  Status: {
    user: status => {
      return db
        .get("users")
        .find({ _id: status.userId })
        .value();
    }
  },
  Query: {
    feed: () =>
      db
        .get("posts")
        .filter({ parentPostId: null })
        .value(),
    responses: (parent, args) => {
      return db
        .get("posts")
        .filter({ parentPostId: args._id })
        .value();
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
