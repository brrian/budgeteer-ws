export type UnknownTransaction = PersonalCapitalTransaction;

export interface Transaction {
  amount: number;
  categoryId: string;
  date: string;
  description: string;
  disabled: boolean;
  id: string;
  service: string;
  serviceId: string;
  splits: [];
}

export interface PersonalCapitalTransaction {
  isInterest: boolean;
  netCost: number;
  accountName: string;
  description: string;
  isCredit: boolean;
  isEditable: boolean;
  isCashOut: boolean;
  merchantId: string;
  price: number;
  userTransactionId: number;
  currency: string;
  isDuplicate: boolean;
  resultType: string;
  originalDescription: string;
  isSpending: boolean;
  amount: number;
  transactionTypeId: number;
  isIncome: boolean;
  includeInCashManager: boolean;
  isNew: boolean;
  isCashIn: boolean;
  transactionDate: string;
  transactionType: string;
  accountId: string;
  originalAmount: number;
  isCost: boolean;
  userAccountId: number;
  simpleDescription: string;
  runningBalance: number;
  hasViewed: boolean;
  categoryId: number;
  status: string;
}
