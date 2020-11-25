import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-lambda';
import { GraphQLJSON } from 'graphql-scalars';
import { groupResolvers, groupTypeDefs } from './group';

const rootTypeDefs = gql`
  scalar JSON

  type Query {
    _: Boolean
  }

  type Mutation {
    _empty: String
  }
`;

const rootResolvers = {
  JSON: GraphQLJSON,
};

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, groupTypeDefs],
  resolvers: [rootResolvers, groupResolvers],
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
