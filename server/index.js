const { ApolloServer, gql } = require("apollo-server");
const shortid = require("shortid");

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
    # isLiked: Boolean
    publishedAt: String
    parentPostId: String
  }

  type Query {
    feed: [Status]
    responses(_id: String): [Status]
  }

  input StatusInput {
    userId: String!
    status: String!
    # mediaUri: String!
  }

  type Mutation {
    createStatus(status: StatusInput): Status
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
  },
  Mutation: {
    createStatus: (parent, args) => {
      const _id = shortid.generate();
      db.get("posts")
        .push({
          _id,
          parentPostId: null,
          userId: args.status.userId,
          status: args.status.status,
          // mediaUri: String
          publishedAt: new Date().toISOString()
        })
        .write();

      return db
        .get("posts")
        .find({ _id })
        .value();
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
