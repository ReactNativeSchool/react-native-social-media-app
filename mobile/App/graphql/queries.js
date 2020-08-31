import { gql } from "apollo-boost";

export const requestFeed = gql`
  {
    feed {
      _id
      publishedAt
      text
      isLiked
      user {
        avatarUri
        name
        username
      }
    }
  }
`;
