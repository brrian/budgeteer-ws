import {
  updateOrCreateMonthEndBalance,
  updateTransaction as updateTransactionItem,
} from '../../../database';
import fetchTransactionByIdDate from '../../../database/fetchTransactionByIdDate';
import updateRunningBalance from '../../../database/updateRunningBalance';
import { FieldResolver } from '../../models';
import { Transaction } from '../models';
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

  const isStale = isStaleTransaction(transaction);

  if (isStale) {
    const savedTransaction = await fetchTransactionByIdDate(
      groupId,
      transaction.id,
      transaction.date
    );

    let balanceDelta = 0;

    if (transaction.disabled === true && savedTransaction.disabled === false) {
      // If we disabled a previously enabled transaction, subtract the old amount
      balanceDelta -= savedTransaction.amount;
    } else if (transaction.disabled === false && savedTransaction.disabled === true) {
      // If we enabled a previously enabled transaction, just add the new amount
      balanceDelta += transaction.amount ?? savedTransaction.amount;
    } else if (transaction.amount) {
      // Otherwise just change the difference
      balanceDelta += transaction.amount - savedTransaction.amount;
    }

    if (balanceDelta !== 0) {
      await Promise.all([
        updateOrCreateMonthEndBalance(groupId, transaction.date, balanceDelta),
        updateRunningBalance(groupId, balanceDelta),
      ]);
    }
  }

  return updateTransactionItem(groupId, transaction);
};

export default updateTransaction;
