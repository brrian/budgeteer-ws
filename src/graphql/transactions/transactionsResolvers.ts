import importTransactions from './mutations/importTransactions';
import updateTransaction from './mutations/updateTransaction';
import transactionsByDateRange from './queries/transactionsByDateRange';
import transactionsByMonthYear from './queries/transactionsByMonthYear';

export default {
  Query: {
    transactionsByDateRange,
    transactionsByMonthYear,
  },
  Mutation: {
    importTransactions,
    updateTransaction,
  },
};
