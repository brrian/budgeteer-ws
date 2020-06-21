export default function errorResponse(message: string, status = 500) {
  console.error(message);

  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify({
      error: true,
      message,
    }),
  };
}
