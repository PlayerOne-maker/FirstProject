import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND as string,
  cache: new InMemoryCache(),
  credentials: 'include',
});