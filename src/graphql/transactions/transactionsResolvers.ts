import importTransactions from './mutations/importTransactions';
import transactionsByDateRange from './queries/transactionsByDateRange';

export default {
  Query: {
    transactionsByDateRange,
  },
  Mutation: {
    importTransactions,
  },
};
