import { Transaction } from '../models';

export default function filterExistingTransactions(
  existingTransactions: Transaction[],
  newTransactions: Transaction[]
): Transaction[] {
  const existingTransactionsIds = new Set(
    existingTransactions.map(({ service, serviceId }) => `${service}-${serviceId}`)
  );

  return newTransactions.filter(
    ({ service, serviceId }) => !existingTransactionsIds.has(`${service}-${serviceId}`)
  );
}
