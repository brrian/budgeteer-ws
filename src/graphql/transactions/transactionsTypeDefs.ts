import { gql } from 'apollo-server-lambda';

export default gql`
  type Transaction {
    amount: Float!
    categoryId: String!
    date: Date!
    description: String!
    disabled: Boolean!
    id: String!
    note: String
    service: String!
    serviceId: String!
    splits: [Split!]!
  }

  type Split {
    amount: Float!
    categoryId: String!
    disabled: Boolean!
    id: String!
    note: String
  }

  extend type Query {
    transactionsByDateRange(start: Date, end: Date): [Transaction!]!
    transactionsByMonthYear(month: Int!, year: Int!): [Transaction!]!
  }

  extend type Mutation {
    importTransactions(service: String!, transactions: [JSON!]!): [Transaction]
  }
`;
