import { gql } from 'apollo-server-lambda';

const groupTypeDefs = gql`
  type Group {
    categories: JSON
    id: String
    name: String
    runningBalance: Int
  }

  extend type Query {
    group: Group
  }
`;

export default groupTypeDefs;
