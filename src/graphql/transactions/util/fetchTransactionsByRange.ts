import { db, Schema } from '../../../util/database';
import { Transaction } from '../models';

export default async function fetchTransactionsByRange(
  groupId: string,
  startDate: string,
  endDate: string
): Promise<Transaction[]> {
  const startTimestamp = new Date(`${startDate}T00:00:00`).getTime();
  const endTimestamp = new Date(`${endDate}T23:59:59`).getTime();

  const results = await db
    .query({
      TableName: Schema.TableName,
      KeyConditionExpression: 'pk = :pk and sk BETWEEN :end AND :start',
      ExpressionAttributeValues: {
        ':end': `${Schema.Entities.Transaction}#${startTimestamp}`,
        ':pk': `${Schema.Entities.Group}#${groupId}`,
        ':start': `${Schema.Entities.Transaction}#${endTimestamp}`,
      },
    })
    .promise();

  return (results.Items as Transaction[]) ?? [];
}
