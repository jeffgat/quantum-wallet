import { MockedProvider } from '@apollo/react-testing';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import BitcoinBalance from './BitcoinBalance';

describe('BitcoinBalance component', () => {
  afterEach(cleanup);

  it('renders loading spinner by default', async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MockedProvider>
        <Router location={history.location} navigator={history}>
          <BitcoinBalance />
        </Router>
      </MockedProvider>
    );

    const balanceLoading = getByTestId('bitcoin_balance_loading');
    expect(balanceLoading).toBeInTheDocument();
  });
});
