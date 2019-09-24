import { gql } from 'apollo-boost';

export const createStatus = gql`
  mutation CreateStatus($statusText: String!, $parentStatusId: String) {
    createStatus(
      status: { text: $statusText, parentStatusId: $parentStatusId }
    ) {
      _id
    }
  }
`;
