import { fetchTransactionsByRange } from '../../../database';
import { FieldResolver } from '../../models';
import getMonthYearTimestamp from '../../util/getMonthYearTimestamp';

interface TransactionsByMonthYearArgs {
  month: number;
  year: number;
}

const transactionsByMonthYear: FieldResolver<TransactionsByMonthYearArgs> = (
  _source,
  { month, year },
  context
) => {
  const timestamp = getMonthYearTimestamp(month, year);

  const startOfMonth = new Date(timestamp);
  const endOfMonth = new Date(year, month, 0);

  const start = startOfMonth.toISOString().substring(0, 10);
  const end = endOfMonth.toISOString().substring(0, 10);

  return fetchTransactionsByRange(context.user.groupId, start, end);
};

export default transactionsByMonthYear;
