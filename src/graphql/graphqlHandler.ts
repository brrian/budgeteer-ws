import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-lambda';
import { DateResolver, GraphQLJSON } from 'graphql-scalars';
import { budgetResolvers, budgetTypeDefs } from './budget';
import { groupResolvers, groupTypeDefs } from './group';
import { transactionsResolvers, transactionsTypeDefs } from './transactions';

const rootTypeDefs = gql`
  scalar Date

  scalar JSON

  type Query {
    _: Boolean
  }

  type Mutation {
    _empty: String
  }
`;

const rootResolvers = {
  Date: DateResolver,
  JSON: GraphQLJSON,
};

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, budgetTypeDefs, groupTypeDefs, transactionsTypeDefs],
  resolvers: [rootResolvers, budgetResolvers, groupResolvers, transactionsResolvers],
});

const server = new ApolloServer({
  context: ({ event, context }) => {
    return {
      event,
      context,
      user: {
        id: event.requestContext.authorizer.claims?.sub,
        groupId: process.env.IS_OFFLINE
          ? 'LOCAL'
          : event.requestContext.authorizer.claims?.['custom:groupId'],
      },
    };
  },
  introspection: process.env.STAGE !== 'prd',
  schema,
});

export default server.createHandler();
