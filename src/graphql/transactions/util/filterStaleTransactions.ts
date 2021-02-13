import { Transaction } from '../models';
import isStaleTransaction from './isStaleTransaction';

export type StaleTransactionsByYearMonth = Map<string, Transaction[]>;

export default function filterStaleTransactions(
  transactions: Transaction[]
): StaleTransactionsByYearMonth | undefined {
  const staleTransactionsByYearMonth: StaleTransactionsByYearMonth = new Map();

  for (const transaction of transactions) {
    const isStale = isStaleTransaction(transaction);
    const transactionYearMonth = transaction.date.substring(0, 7);

    if (isStale) {
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
