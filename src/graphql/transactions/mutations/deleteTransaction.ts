import { deleteTransaction as deleteTransactionItem } from '../../../database';
import { FieldResolver } from '../../models';
import { Transaction } from '../models';

interface DeleteTransactionArgs {
  transaction: Partial<Transaction> & Pick<Transaction, 'id' | 'date'>;
}

const deleteTransaction: FieldResolver<DeleteTransactionArgs> = (
  _source,
  { transaction },
  context
) => {
  const { groupId } = context.user;

  return deleteTransactionItem(groupId, transaction);
};

export default deleteTransaction;
