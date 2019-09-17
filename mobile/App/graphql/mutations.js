import { gql } from 'apollo-boost';

export const likeStatus = gql`
  mutation likeStatus($userId: String!, $statusId: String!) {
    likeStatus(userId: $userId, statusId: $statusId) {
      _id
      isLiked
    }
  }
`;
