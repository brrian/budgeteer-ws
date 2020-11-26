import { nanoid as uuid } from 'nanoid';
import { PersonalCapitalTransaction, Transaction, UnknownTransaction } from '../models';

export default function transformTransaction(
  service: string,
  transactions: UnknownTransaction[]
): Transaction[] {
  switch (service) {
    case 'personal-capital': {
      return (transactions as PersonalCapitalTransaction[]).map(transaction => ({
        amount: transaction.amount,
        categoryId: `${transaction.categoryId}`,
        date: transaction.transactionDate,
        description: transaction.description,
        disabled: false,
        id: uuid(),
        service,
        serviceId: `${transaction.userTransactionId}`,
        splits: [],
      }));
    }
    default:
      throw new Error(`Unknown service "${service}"`);
  }
}
