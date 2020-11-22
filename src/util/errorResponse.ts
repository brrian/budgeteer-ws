import { APIGatewayProxyResult } from 'aws-lambda';

export default function errorResponse(message: string, status = 500): APIGatewayProxyResult {
  console.error(message);

  return {
    statusCode: status,
    body: JSON.stringify({
      error: true,
      message,
    }),
  };
}
