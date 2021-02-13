import { db, Schema } from '.';
import { Transaction } from '../graphql/transactions/models';
import getTimestampFromDate from '../util/getTimestampFromDate';

export default async function fetchTransactionByIdDate(
  groupId: string,
  id: string,
  date: Date | string
): Promise<Transaction> {
  const timestamp = getTimestampFromDate(date);
  const key = `${Schema.Entities.Transaction}#${timestamp}#${id}`;

  const result = await db
    .get({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Group}#${groupId}`,
        sk: key,
      },
    })
    .promise();

  if (!result.Item) {
    throw new Error(`Unable to fetch transaction with id "${id}" and date "${date}"`);
  }

  return result.Item as Transaction;
}
