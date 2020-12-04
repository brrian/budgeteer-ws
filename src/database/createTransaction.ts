import { db, Schema } from '.';
import { Transaction } from '../graphql/transactions/models';
import getTimestampFromDate from '../util/getTimestampFromDate';

export default async function createTransaction(
  groupId: string,
  transaction: Transaction
): Promise<Transaction> {
  const timestamp = getTimestampFromDate(transaction.date);

  await db
    .put({
      TableName: Schema.TableName,
      Item: {
        pk: `${Schema.Entities.Group}#${groupId}`,
        sk: `${Schema.Entities.Transaction}#${timestamp}#${transaction.id}`,
        ...transaction,
      },
    })
    .promise()
    .catch(error => {
      throw new Error(`Unable to create transaction: ${error.message}`);
    });

  return transaction;
}
