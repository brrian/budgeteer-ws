import { ClientConfiguration, DocumentClient } from 'aws-sdk/clients/dynamodb';

const dynamoConfig: ClientConfiguration = {};

if (process.env.IS_OFFLINE) {
  dynamoConfig.region = 'localhost';
  dynamoConfig.endpoint = process.env.DYNAMODB_ENDPOINT || 'http://localhost:3001';
}

export const db = new DocumentClient(dynamoConfig);

export const Schema = {
  TableName: process.env.DYNAMODB_TABLE || 'budgeteer',
  Indexes: {
    GS1: 'GS1',
  },
  Entities: {
    Budget: 'BUDGET',
    Group: 'GROUP',
    MonthEndBalance: 'MONTH_END_BALANCE',
    Transaction: 'TRANSACTION',
  },
};
