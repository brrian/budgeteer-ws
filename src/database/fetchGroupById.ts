import { db, Schema } from '.';

interface Group {
  categories: string;
  id: string;
  name: string;
  runningBalance: number;
}

export default async function fetchGroupById(id: string): Promise<Group> {
  const group = await db
    .get({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Group}#${id}`,
        sk: Schema.Entities.Group,
      },
    })
    .promise();

  if (!group.Item) {
    throw new Error(`Unable to find group with id "${id}"`);
  }

  return group.Item as Group;
}
