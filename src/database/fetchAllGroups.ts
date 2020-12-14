import { db, Schema } from '.';
import { Group } from './models';

export default async function fetchAllGroups(): Promise<Group[]> {
  const groups = await db
    .query({
      TableName: Schema.TableName,
      IndexName: Schema.Indexes.GS1,
      KeyConditionExpression: 'sk = :sk',
      ExpressionAttributeValues: {
        ':sk': Schema.Entities.Group,
      },
    })
    .promise();

  return (groups.Items as Group[]) ?? [];
}
