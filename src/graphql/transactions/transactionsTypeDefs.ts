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
    note: String
  }

  input TransactionInput {
    amount: Float
    categoryId: String
    date: Date!
    description: String
    disabled: Boolean
    id: String!
    note: String
    service: String
    serviceId: String
    splits: [SplitInput!]
  }

  input SplitInput {
    amount: Float!
    categoryId: String!
    disabled: Boolean!
    note: String!
  }

  extend type Query {
    transactionsByDateRange(start: Date, end: Date): [Transaction!]!
    transactionsByMonthYear(month: Int!, year: Int!): [Transaction!]!
  }

  extend type Mutation {
    deleteTransaction(transaction: TransactionInput!): Boolean!
    importTransactions(service: String!, transactions: [JSON!]!): [Transaction]
    updateTransaction(transaction: TransactionInput!): Transaction!
  }
`;
