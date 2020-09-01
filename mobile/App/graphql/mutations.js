import { gql } from "@apollo/client";

export const login = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const register = gql`
  mutation register($username: String!, $name: String!, $password: String!) {
    register(user: { username: $username, name: $name, password: $password }) {
      _id
    }
  }
`;

export const likePost = gql`
  mutation LikePost($postId: String!) {
    likePost(postId: $postId) {
      _id
      isLiked
    }
  }
`;

export const createPost = gql`
  mutation CreatePost($text: String!, $parentPostId: String) {
    createPost(post: { text: $text, parentPostId: $parentPostId }) {
      _id
      text
    }
  }
`;
