import { Transaction } from '../models';

export type StaleTransactionsByYearMonth = Map<string, Transaction[]>;

export default function isStaleTransaction(transaction: Pick<Transaction, 'date'>): boolean {
  const currentYearMonth = new Date().toISOString().substring(0, 7);
  const transactionYearMonth = new Date(transaction.date).toISOString().substring(0, 7);

  return currentYearMonth !== transactionYearMonth;
}
