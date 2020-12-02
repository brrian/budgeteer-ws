import { db, Schema } from '../../../util/database';
import getMonthYearTimestamp from '../../util/getMonthYearTimestamp';
import { Budget } from '../models';

export default async function fetchBudgetByMonthYear(
  groupId: string,
  month: number,
  year?: number
): Promise<Budget> {
  const timestamp = getMonthYearTimestamp(month, year);

  const results = await db
    .query({
      TableName: Schema.TableName,
      KeyConditionExpression: 'pk = :pk and sk BETWEEN :start AND :end',
      ExpressionAttributeValues: {
        ':end': `${Schema.Entities.Budget}#${timestamp}`,
        ':pk': `${Schema.Entities.Group}#${groupId}`,
        ':start': Schema.Entities.Budget,
      },
      ScanIndexForward: false,
      Limit: 1,
    })
    .promise();

  let budget;
  if (results.Items?.length) {
    budget = results.Items[0];
  }

  return {
    categories: budget ? JSON.parse(budget.categories) : [],
    total: budget?.total ?? 1,
  };
}
