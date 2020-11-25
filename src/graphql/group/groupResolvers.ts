import fetchGroupById from '../../util/fetchGroupById';
import { FieldResolver } from '../models';

const group: FieldResolver = async (_source, _args, context) => {
  const { groupId } = context.user;

  const group = await fetchGroupById(groupId);

  return {
    categories: JSON.parse(group.categories),
    id: groupId,
    name: group.name,
    runningBalance: group.runningBalance,
  };
};

export default {
  Query: {
    group,
  },
};
