import { gql } from 'apollo-boost';

export const likeStatus = gql`
  mutation likeStatus($statusId: String!) {
    likeStatus(statusId: $statusId) {
      _id
      isLiked
    }
  }
`;

export const createStatus = gql`
  mutation createStatus($status: String!, $parentPostId: String) {
    createStatus(status: { status: $status, parentPostId: $parentPostId }) {
      _id
    }
  }
`;
