import importTransactions from './mutations/importTransactions';
import transactionsByDateRange from './queries/transactionsByDateRange';
import transactionsByMonthYear from './queries/transactionsByMonthYear';

export default {
  Query: {
    transactionsByDateRange,
    transactionsByMonthYear,
  },
  Mutation: {
    importTransactions,
  },
};
