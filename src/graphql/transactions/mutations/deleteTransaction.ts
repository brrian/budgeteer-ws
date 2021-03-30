import {
  deleteTransaction as deleteTransactionItem,
  fetchTransactionByIdDate,
  updateOrCreateMonthEndBalance,
} from '../../../database';
import updateRunningBalance from '../../../database/updateRunningBalance';
import { FieldResolver } from '../../models';
import { Transaction } from '../models';
import getTransactionBalance from '../util/getTransactionBalance';

interface DeleteTransactionArgs {
  transaction: Partial<Transaction> & Pick<Transaction, 'id' | 'date'>;
}

const deleteTransaction: FieldResolver<DeleteTransactionArgs> = async (
  _source,
  { transaction },
  context
) => {
  const { groupId } = context.user;

  const savedTransaction = await fetchTransactionByIdDate(
    groupId,
    transaction.id,
    transaction.date
  );

  const balance = getTransactionBalance(savedTransaction);

  if (balance !== 0) {
    await Promise.all([
      updateOrCreateMonthEndBalance(groupId, transaction.date, balance),
      updateRunningBalance(groupId, balance),
    ]);
  }

  return deleteTransactionItem(groupId, transaction);
};

export default deleteTransaction;
