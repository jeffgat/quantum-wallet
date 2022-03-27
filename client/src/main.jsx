import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const client = new ApolloClient({
  uri:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:443/graphql'
      : 'https://server.jeff-apps.com/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <ChakraProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
