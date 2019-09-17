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
    isLiked: Boolean
    publishedAt: String
    parentPostId: String
  }

  type Query {
    feed: [Status]
    responses(_id: String): [Status]
  }

  input StatusInput {
    status: String!
    # mediaUri: String!
  }

  type Mutation {
    createStatus(status: StatusInput): Status
    likeStatus(statusId: String!): Status
  }
`;

const resolvers = {
  Status: {
    user: status => {
      return db
        .get("users")
        .find({ _id: status.userId })
        .value();
    },
    isLiked: (status, args, context) => {
      return db.get(`likes.${context.userId}`, {}).value()[status._id] || false;
    }
  },
  Query: {
    feed: () => {
      return db
        .get("posts")
        .filter({ parentPostId: null })
        .value();
    },
    responses: (parent, args) => {
      return db
        .get("posts")
        .filter({ parentPostId: args._id })
        .value();
    }
  },
  Mutation: {
    createStatus: (parent, { status }, context) => {
      const _id = shortid.generate();
      db.get("posts")
        .push({
          _id,
          parentPostId: null,
          userId: context.userId,
          status: status.status,
          // mediaUri: String
          publishedAt: new Date().toISOString()
        })
        .write();

      return db
        .get("posts")
        .find({ _id })
        .value();
    },

    likeStatus: (parent, { statusId }, context) => {
      const key = `likes.${context.userId}`;
      const currentLikes = db.get(key, {}).value();
      const currentLikeStatus = currentLikes[statusId] || false;
      db.set(key, {
        ...currentLikes,
        [statusId]: !currentLikeStatus
      }).write();

      return db
        .get("posts")
        .find({ _id: statusId })
        .value();
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      userId: req.headers.userid
    };
  }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
