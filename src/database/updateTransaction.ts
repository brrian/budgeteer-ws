import { createUpdateExpression, db, Schema } from '.';
import { Transaction } from '../graphql/transactions/models';
import getTimestampFromDate from '../util/getTimestampFromDate';

export default async function updateTransaction(
  groupId: string,
  transaction: Partial<Transaction> & Pick<Transaction, 'id' | 'date'>
): Promise<Transaction> {
  const timestamp = getTimestampFromDate(transaction.date);

  const result = await db
    .update({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Group}#${groupId}`,
        sk: `${Schema.Entities.Transaction}#${timestamp}#${transaction.id}`,
      },
      ReturnValues: 'ALL_NEW',
      ...createUpdateExpression(transaction, ['id', 'date']),
    })
    .promise()
    .catch(error => {
      throw new Error(`Unable to update transaction: ${error.message}`);
    });

  return result.Attributes as Transaction;
}
