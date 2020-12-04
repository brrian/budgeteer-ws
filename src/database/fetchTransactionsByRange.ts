import { Transaction } from '../graphql/transactions/models';
import getTimestampFromDate from '../util/getTimestampFromDate';
import { db, Schema } from './database';

export default async function fetchTransactionsByRange(
  groupId: string,
  startDate: string,
  endDate: string
): Promise<Transaction[]> {
  const startTimestamp = getTimestampFromDate(startDate);
  const endTimestamp = getTimestampFromDate(endDate, true);

  const results = await db
    .query({
      TableName: Schema.TableName,
      KeyConditionExpression: 'pk = :pk and sk BETWEEN :end AND :start',
      ExpressionAttributeValues: {
        ':end': `${Schema.Entities.Transaction}#${startTimestamp}`,
        ':pk': `${Schema.Entities.Group}#${groupId}`,
        ':start': `${Schema.Entities.Transaction}#${endTimestamp}`,
      },
      ScanIndexForward: false,
    })
    .promise();

  return (results.Items as Transaction[]) ?? [];
}
