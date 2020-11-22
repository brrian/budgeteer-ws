import fetchGroupById from '../../util/fetchGroupById';
import { FieldResolver } from '../models';

const group: FieldResolver = async (_source, _args, context) => {
  const { groupId } = context.user;

  const group = await fetchGroupById(groupId);

  return {
    id: groupId,
    name: group.name,
  };
};

export default {
  Query: {
    group,
  },
};
