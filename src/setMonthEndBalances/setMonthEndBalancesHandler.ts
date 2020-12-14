import { APIGatewayProxyHandler } from 'aws-lambda';
import { fetchBudgetByMonthYear, fetchTransactionsByRange } from '../database';
import createMonthEndBalance from '../database/createMonthEndBalance';
import fetchAllGroups from '../database/fetchAllGroups';
import updateRunningBalance from '../database/updateRunningBalance';
import calculateTransactionsTotal from './util/calculateTransactionsTotal';
import parsePrevMonth from './util/parsePrevMonth';

const setMonthEndBalancesHandler: APIGatewayProxyHandler = async () => {
  try {
    const { endOfMonth, month, startOfMonth, year } = parsePrevMonth();

    const groups = await fetchAllGroups();

    for (const { groupId } of groups) {
      const [budget, transactions] = await Promise.all([
        fetchBudgetByMonthYear(groupId, month, year),
        fetchTransactionsByRange(groupId, startOfMonth, endOfMonth),
      ]);

      const transactionsTotal = calculateTransactionsTotal(transactions);

      const monthEndBalance = +(budget.total - transactionsTotal).toFixed(2);

      await Promise.all([
        createMonthEndBalance(groupId, startOfMonth, monthEndBalance),
        updateRunningBalance(groupId, monthEndBalance),
      ]);
    }

    return {
      statusCode: 200,
      body: 'success',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};

export default setMonthEndBalancesHandler;
