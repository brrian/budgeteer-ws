import { APIGatewayProxyResult } from 'aws-lambda';

interface Data {
  [key: string]: any;
}

export default function successResponse(data: Data, status = 200): APIGatewayProxyResult {
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify(data),
  };
}
