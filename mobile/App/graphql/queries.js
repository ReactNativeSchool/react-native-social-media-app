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
      user {
        _id
        username
        avatarUri
        name
      }
    }
  }
`;
