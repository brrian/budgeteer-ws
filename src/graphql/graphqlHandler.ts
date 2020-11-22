import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-lambda';
import { groupResolvers, groupTypeDefs } from './group';

const baseTypeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _empty: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [baseTypeDefs, groupTypeDefs],
  resolvers: [groupResolvers],
});

const server = new ApolloServer({
  context: ({ event, context }) => {
    return {
      event,
      context,
      user: {
        id: event.requestContext.authorizer.claims?.sub,
        groupId: event.requestContext.authorizer.claims?.['custom:groupId'],
      },
    };
  },
  introspection: process.env.STAGE !== 'prd',
  schema,
});

export default server.createHandler();
