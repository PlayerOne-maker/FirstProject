import React from 'react';
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo/client'
import Layout from './components/Layout'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import {Provider} from 'react-redux'
import store from './store'

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
