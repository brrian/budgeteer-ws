import { createTransaction, fetchTransactionsByRange } from '../../../database';
import { FieldResolver } from '../../models';
import { UnknownTransaction } from '../models';
import filterExistingTransactions from '../util/filterExistingTransactions';
import getTransactionsDateRange from '../util/getTransactionsDateRange';
import transformTransaction from '../util/transformTransaction';

interface ImportTransactionsArgs {
  service: string;
  transactions: UnknownTransaction[];
}

const importTransactions: FieldResolver<ImportTransactionsArgs> = async (
  _source,
  { service, transactions },
  context
) => {
  const { groupId } = context.user;

  const transformedTransactions = transformTransaction(service, transactions);

  // Filter out transactions that have already been imported
  const dateRange = getTransactionsDateRange(transformedTransactions);
  const existingTransactions = await fetchTransactionsByRange(groupId, ...dateRange);
  const newTransactions = filterExistingTransactions(existingTransactions, transformedTransactions);

  await Promise.all(newTransactions.map(transaction => createTransaction(groupId, transaction)));

  return newTransactions;
};

export default importTransactions;
