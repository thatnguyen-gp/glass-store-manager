import { ApolloClient, InMemoryCache } from '@apollo/client';

const productClient = new ApolloClient({
  uri: 'http://localhost:7777/graphql/products', // URL của backend GraphQL API
  cache: new InMemoryCache(),
});

export default productClient;
