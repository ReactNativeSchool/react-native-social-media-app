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

export const likePost = gql`
  mutation LikePost($postId: String!) {
    likePost(postId: $postId) {
      _id
      isLiked
    }
  }
`;
