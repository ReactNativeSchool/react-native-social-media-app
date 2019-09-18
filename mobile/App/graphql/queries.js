import { gql } from 'apollo-boost';

export const requestFeed = gql`
  {
    feed {
      _id
      userId
      user {
        avatarUri
        name
        username
      }
      status
      isLiked
      publishedAt
    }
  }
`;

export const requestResponses = gql`
  query Responses($_id: String!) {
    responses(_id: $_id) {
      _id
      userId
      user {
        avatarUri
        name
        username
      }
      status
      isLiked
      publishedAt
    }
  }
`;
