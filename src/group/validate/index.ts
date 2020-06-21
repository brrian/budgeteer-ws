import { APIGatewayProxyHandler } from 'aws-lambda';
import { client as db, Schema } from '../../util/database';
import successResponse from '../../util/successResponse';

const handler: APIGatewayProxyHandler = async event => {
  const results = await db
    .get({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Group}#${event.pathParameters?.id}`,
        sk: Schema.Entities.Group,
      },
    })
    .promise();

  return successResponse({
    isValid: !!Object.keys(results).length,
  });
};

export default handler;
