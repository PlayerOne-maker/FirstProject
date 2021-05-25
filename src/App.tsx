import React from 'react';
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo/client'
import Layout from './components/Layout'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AuthProvider from './context/AuthProvider'

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
