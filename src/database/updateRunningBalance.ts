import { db, Schema } from '.';
import fetchGroupById from './fetchGroupById';

export default async function updateRunningBalance(
  groupId: string,
  balance: number
): Promise<void> {
  const { runningBalance } = await fetchGroupById(groupId);

  await db
    .update({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Group}#${groupId}`,
        sk: Schema.Entities.Group,
      },
      UpdateExpression: 'SET runningBalance = :runningBalance',
      ExpressionAttributeValues: {
        ':runningBalance': runningBalance + balance,
      },
    })
    .promise()
    .catch(error => {
      throw new Error(`Unable to update running balance: ${error.message}`);
    });
}
