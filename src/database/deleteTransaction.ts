import { db, Schema } from '.';
import { Transaction } from '../graphql/transactions/models';
import getTimestampFromDate from '../util/getTimestampFromDate';

export default async function deleteTransaction(
  groupId: string,
  transaction: Partial<Transaction> & Pick<Transaction, 'id' | 'date'>
): Promise<boolean> {
  const timestamp = getTimestampFromDate(transaction.date);

  await db
    .delete({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Group}#${groupId}`,
        sk: `${Schema.Entities.Transaction}#${timestamp}#${transaction.id}`,
      },
    })
    .promise()
    .catch(error => {
      throw new Error(`Unable to delete transaction: ${error.message}`);
    });

  return true;
}
