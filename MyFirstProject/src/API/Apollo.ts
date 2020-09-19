

import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
    avatar: String
  }

  type Query {
    users: [User]
  }
`;

export const apolloServer = {
    Start(users) {
        // Resolvers define the technique for fetching the types defined in the
        // schema. This resolver retrieves books from the "books" array above.
        const resolvers = {
            Query: {
                users: () => users,
            },
        };

        // The ApolloServer constructor requires two parameters: your schema
        // definition and your set of resolvers.
        const server = new ApolloServer({ typeDefs, resolvers });
        
        // The `listen` method launches a web server.
        server.listen().then(({ url }) => {
            console.log(`🚀  Server ready at ${url}`);
        });
    }
}
