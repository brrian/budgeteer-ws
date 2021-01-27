import { Transaction } from '../models';

export type StaleTransactionsByYearMonth = Map<string, Transaction[]>;

export default function filterStaleTransactions(
  transactions: Transaction[]
): StaleTransactionsByYearMonth | undefined {
  const currentYearMonth = new Date().toISOString().substring(0, 7);
  const staleTransactionsByYearMonth: StaleTransactionsByYearMonth = new Map();

  for (const transaction of transactions) {
    const transactionYearMonth = transaction.date.substr(0, 7);

    if (transactionYearMonth !== currentYearMonth) {
      const staleTransactions = staleTransactionsByYearMonth.get(transactionYearMonth) ?? [];

      staleTransactions.push(transaction);

      staleTransactionsByYearMonth.set(transactionYearMonth, staleTransactions);
    }
  }

  if (!staleTransactionsByYearMonth.size) {
    return;
  }

  return staleTransactionsByYearMonth;
}
