import { APIGatewayProxyResult } from 'aws-lambda';

export default function successResponse(
  data: Record<string, unknown>,
  status = 200
): APIGatewayProxyResult {
  return {
    statusCode: status,
    body: JSON.stringify(data),
  };
}
