import { db, Schema } from '.';
import getTimestampFromDate from '../util/getTimestampFromDate';

export default async function createMonthEndBalance(
  groupId: string,
  date: string | Date,
  balance: number
): Promise<void> {
  const timestamp = getTimestampFromDate(date);

  await db
    .put({
      TableName: Schema.TableName,
      Item: {
        pk: `${Schema.Entities.Group}#${groupId}`,
        sk: `${Schema.Entities.MonthEndBalance}#${timestamp}`,
        balance,
      },
    })
    .promise()
    .catch(error => {
      throw new Error(`Unable to create month end balance: ${error.message}`);
    });
}
