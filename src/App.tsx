import React from 'react';
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo/client'
import Layout from './components/Layout'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
