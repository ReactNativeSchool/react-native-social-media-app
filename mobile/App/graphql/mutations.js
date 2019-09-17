import { gql } from 'apollo-boost';

export const likeStatus = gql`
  mutation likeStatus($statusId: String!) {
    likeStatus(statusId: $statusId) {
      _id
      isLiked
    }
  }
`;
