import { gql } from 'apollo-server-lambda';

const groupTypeDefs = gql`
  type Group {
    id: String
    name: String
  }

  extend type Query {
    group: Group
  }
`;

export default groupTypeDefs;
