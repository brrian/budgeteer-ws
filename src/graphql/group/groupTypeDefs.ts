import { gql } from 'apollo-server-lambda';

export default gql`
  type Group {
    categories: JSON!
    id: String!
    name: String!
    runningBalance: Float!
  }

  extend type Query {
    group: Group
  }
`;
