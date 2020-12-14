import { Transaction } from '../../graphql/transactions/models';

export default function calculateTransactionsTotal(transactions: Transaction[]): number {
  let total = 0;

  for (const transaction of transactions) {
    if (!transaction.disabled) {
      total += transaction.amount;
    }

    for (const split of transaction.splits) {
      if (!split.disabled) {
        total += split.amount;
      }
    }
  }

  return +total.toFixed(2);
}
