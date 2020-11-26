import { db, Schema } from '../../../util/database';
import { FieldResolver } from '../../models';
import { UnknownTransaction } from '../models';
import fetchTransactionsByRange from '../util/fetchTransactionsByRange';
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

  await Promise.all(
    newTransactions.map(transaction => {
      const timestamp = new Date(`${transaction.date}T00:00:00`).getTime();

      return db
        .put({
          TableName: Schema.TableName,
          Item: {
            pk: `${Schema.Entities.Group}#${context.user.groupId}`,
            sk: `${Schema.Entities.Transaction}#${timestamp}#${transaction.id}`,
            ...transaction,
          },
        })
        .promise();
    })
  );

  return newTransactions;
};

export default importTransactions;
