import { APIGatewayProxyHandler } from 'aws-lambda';
import errorResponse from '../util/errorResponse';
import fetchGroupById from '../util/fetchGroupById';
import successResponse from '../util/successResponse';

const validateGroupHandler: APIGatewayProxyHandler = async event => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return errorResponse('Missing "id" parameter in URL', 400);
    }

    const group = await fetchGroupById(id).catch(() => null);

    return successResponse({
      isValid: !!group,
    });
  } catch (error) {
    return errorResponse(error.message);
  }
};

export default validateGroupHandler;
