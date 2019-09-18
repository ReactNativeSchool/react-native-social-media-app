const { gql } = require("apollo-server");

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
    parentPostId: String
  }

  type Mutation {
    createStatus(status: StatusInput): Status
    likeStatus(statusId: String!): Status
  }
`;

module.exports = typeDefs;
