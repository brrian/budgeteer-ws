import { db, Schema, fetchMonthEndBalanceByDate } from '.';
import getTimestampFromDate from '../util/getTimestampFromDate';
import createMonthEndBalance from './createMonthEndBalance';

export default async function updateOrCreateMonthEndBalance(
  groupId: string,
  date: string,
  amount: number
): Promise<void> {
  const timestamp = getTimestampFromDate(date);

  const startOfMonth = new Date(timestamp);
  startOfMonth.setDate(1);

  try {
    const monthEndBalance = await fetchMonthEndBalanceByDate(groupId, startOfMonth);

    await db
      .update({
        TableName: Schema.TableName,
        Key: {
          pk: `${Schema.Entities.Group}#${groupId}`,
          sk: `${Schema.Entities.MonthEndBalance}#${startOfMonth.getTime()}`,
        },
        UpdateExpression: 'SET balance = :balance',
        ExpressionAttributeValues: {
          ':balance': monthEndBalance.balance + amount,
        },
      })
      .promise()
      .catch(error => {
        throw new Error(`Unable to update month end balance: ${error.message}`);
      });
  } catch (error) {
    if (error.message.startsWith('Unable to find month end balance')) {
      await createMonthEndBalance(groupId, startOfMonth, amount);
    } else {
      throw error;
    }
  }
}
