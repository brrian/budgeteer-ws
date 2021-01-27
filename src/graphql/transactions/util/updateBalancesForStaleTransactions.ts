import { updateOrCreateMonthEndBalance } from '../../../database';
import updateRunningBalance from '../../../database/updateRunningBalance';
import { StaleTransactionsByYearMonth } from './filterStaleTransactions';

export default async function updateBalancesForStaleTransactions(
  groupId: string,
  staleTransactionsByYearMonth: StaleTransactionsByYearMonth
): Promise<void> {
  let runningTotal = 0;

  await Promise.all(
    Array.from(staleTransactionsByYearMonth.entries()).map(([yearMonth, staleTransactions]) => {
      const total = staleTransactions.reduce((accTotal, transaction) => {
        return accTotal - transaction.amount;
      }, 0);

      runningTotal += total;

      const dateString = `${yearMonth}-01`;

      return updateOrCreateMonthEndBalance(groupId, dateString, total);
    })
  );

  await updateRunningBalance(groupId, runningTotal);
}
