const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: String
    avatarUri: String
    name: String
    username: String
  }

  type Post {
    _id: String
    userId: String
    text: String
    publishedAt: String
    parentPostId: String
    user: User
    isLiked: Boolean
  }

  type Query {
    feed: [Post]
    responses(_id: String): [Post]
  }

  input PostInput {
    text: String!
    parentPostId: String
  }

  type Mutation {
    createPost(post: PostInput): Post
    likePost(postId: String!): Post
  }
`;

module.exports = typeDefs;
