import { db, Schema } from './database';

interface Group {
  id: string;
  name: string;
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
