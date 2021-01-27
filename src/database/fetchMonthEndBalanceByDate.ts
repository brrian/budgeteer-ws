import { db, Schema } from '.';
import getTimestampFromDate from '../util/getTimestampFromDate';
import { MonthEndBalance } from './models';

export default async function fetchMonthEndBalanceByDate(
  groupId: string,
  date: string | Date
): Promise<MonthEndBalance> {
  const timestamp = getTimestampFromDate(date);

  const monthEndBalance = await db
    .get({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Group}#${groupId}`,
        sk: `${Schema.Entities.MonthEndBalance}#${timestamp}`,
      },
    })
    .promise();

  if (!monthEndBalance.Item) {
    throw new Error(`Unable to find month end balance for "${date}"`);
  }

  return monthEndBalance.Item as MonthEndBalance;
}
