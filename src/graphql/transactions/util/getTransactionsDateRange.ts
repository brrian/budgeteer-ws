import { Transaction } from '../models';

export default function getTransactionsDateRange(transactions: Transaction[]): [string, string] {
  let firstTransaction = transactions[0];
  let lastTransaction = transactions[0];

  for (const transaction of transactions) {
    const timestamp = new Date(transaction.date).getTime();

    if (timestamp < new Date(firstTransaction.date).getTime()) {
      firstTransaction = transaction;
    }

    if (timestamp > new Date(lastTransaction.date).getTime()) {
      lastTransaction = transaction;
    }
  }

  return [firstTransaction.date, lastTransaction.date];
}
