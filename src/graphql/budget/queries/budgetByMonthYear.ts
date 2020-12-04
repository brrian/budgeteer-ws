import { fetchBudgetByMonthYear } from '../../../database';
import { FieldResolver } from '../../models';

interface BudgetByMonthYearArgs {
  month: number;
  year?: number;
}

const budgetByMonthYear: FieldResolver<BudgetByMonthYearArgs> = async (
  _source,
  { month, year = new Date().getFullYear() },
  context
) => {
  const { groupId } = context.user;

  return fetchBudgetByMonthYear(groupId, month, year);
};

export default budgetByMonthYear;
