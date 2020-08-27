import { gql } from 'apollo-boost';

export const exampleQuery = gql`
  {
    example {
      text
    }
  }
`;

export const requestFeed = gql`
  {
    feed {
      _id
      status
      userId
      publishedAt
      isLiked
      user {
        _id
        username
        avatarUri
        name
      }
    }
  }
`;

export const requestResponses = gql`
  query Responses($_id: String!) {
    responses(_id: $_id) {
      _id
      status
      userId
      publishedAt
      isLiked
      user {
        _id
        username
        avatarUri
        name
      }
    }
  }
`;
