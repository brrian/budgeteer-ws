import { fetchTransactionsByRange } from '../../../database';
import { FieldResolver } from '../../models';

interface TransactionsByDateRangeArgs {
  end: string;
  start: string;
}

const transactionsByDateRange: FieldResolver<TransactionsByDateRangeArgs> = (
  _source,
  { end, start },
  context
) => {
  return fetchTransactionsByRange(context.user.groupId, start, end);
};

export default transactionsByDateRange;
