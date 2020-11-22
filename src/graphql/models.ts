import { IFieldResolver } from 'apollo-server-lambda';
import { APIGatewayEventRequestContext, APIGatewayProxyEvent } from 'aws-lambda';

interface Context {
  event: APIGatewayProxyEvent;
  context: APIGatewayEventRequestContext;
  user: {
    id: string;
    groupId: string;
  };
}

export type FieldResolver<TArgs = Record<string, any>, TSource = void> = IFieldResolver<
  TSource,
  Context,
  TArgs
>;
