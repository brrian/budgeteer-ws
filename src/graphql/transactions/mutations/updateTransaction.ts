import { updateTransaction as updateTransactionItem } from '../../../database';
import { FieldResolver } from '../../models';
import { Transaction } from '../models';

interface UpdateTransactionArgs {
  transaction: Partial<Transaction> & Pick<Transaction, 'id' | 'date'>;
}

const updateTransaction: FieldResolver<UpdateTransactionArgs> = (
  _source,
  { transaction },
  context
) => {
  const { groupId } = context.user;

  return updateTransactionItem(groupId, transaction);
};

export default updateTransaction;
