import { gql } from "@apollo/client";

const postItemFragment = gql`
  fragment PostItem on Post {
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
`;

export const requestFeed = gql`
  query {
    feed {
      ...PostItem
    }
  }

  ${postItemFragment}
`;

export const requestResponses = gql`
  query($_id: String!) {
    responses(_id: $_id) {
      ...PostItem
    }
  }

  ${postItemFragment}
`;
