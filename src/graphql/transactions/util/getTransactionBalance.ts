import { Transaction } from '../models';

export default function getTransactionBalance(transaction: Transaction): number {
  let balance = 0;

  if (!transaction.disabled) {
    balance += transaction.amount;
  }

  if (transaction.splits) {
    for (const split of transaction.splits) {
      if (!split.disabled) {
        balance += split.amount;
      }
    }
  }

  return balance;
}
