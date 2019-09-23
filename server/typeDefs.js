const { gql } = require("apollo-server");

const typeDefs = gql`
  type Example {
    _id: String
    text: String
  }

  type Query {
    example: Example
  }
`;

module.exports = typeDefs;
