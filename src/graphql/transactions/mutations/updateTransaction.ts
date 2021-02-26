import {
  updateOrCreateMonthEndBalance,
  updateTransaction as updateTransactionItem,
} from '../../../database';
import fetchTransactionByIdDate from '../../../database/fetchTransactionByIdDate';
import updateRunningBalance from '../../../database/updateRunningBalance';
import { FieldResolver } from '../../models';
import { Transaction } from '../models';
import getTransactionBalance from '../util/getTransactionBalance';
import isStaleTransaction from '../util/isStaleTransaction';

interface UpdateTransactionArgs {
  transaction: Partial<Transaction> & Pick<Transaction, 'id' | 'date'>;
}

const updateTransaction: FieldResolver<UpdateTransactionArgs> = async (
  _source,
  { transaction },
  context
) => {
  const { groupId } = context.user;

  const oldTransaction = isStaleTransaction(transaction)
    ? await fetchTransactionByIdDate(groupId, transaction.id, transaction.date)
    : undefined;

  const updatedTransaction = await updateTransactionItem(groupId, transaction);

  if (oldTransaction) {
    const oldBalance = getTransactionBalance(oldTransaction);
    const newBalance = getTransactionBalance(updatedTransaction);

    const balanceDelta = oldBalance - newBalance;

    if (balanceDelta !== 0) {
      await Promise.all([
        updateOrCreateMonthEndBalance(groupId, transaction.date, balanceDelta),
        updateRunningBalance(groupId, balanceDelta),
      ]);
    }
  }

  return updatedTransaction;
};

export default updateTransaction;
