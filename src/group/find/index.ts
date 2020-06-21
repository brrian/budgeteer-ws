import { APIGatewayProxyHandler } from 'aws-lambda';
import { client as db, Schema } from '../../util/database';
import errorResponse from '../../util/errorResponse';
import successResponse from '../../util/successResponse';

const handler: APIGatewayProxyHandler = async event => {
  const groupId = event.requestContext.authorizer?.claims['custom:groupId'];

  const group = await db
    .get({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Group}#${groupId}`,
        sk: Schema.Entities.Group,
      },
    })
    .promise();

  if (!group.Item) {
    return errorResponse(`Unable to find group for id "${groupId}"`);
  }

  return successResponse(group.Item);
};

export default handler;
