import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: 'Bearer 123',
      },
    });
  },
});
