import { gql } from 'apollo-server-lambda';

export default gql`
  type Budget {
    categories: [BudgetCategory!]!
    total: Int!
  }

  type BudgetCategory {
    categoryId: String!
    limit: Int!
  }

  extend type Query {
    budgetByMonthYear(month: Int!, year: Int!): Budget
  }
`;
