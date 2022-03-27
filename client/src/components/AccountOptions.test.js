import { MockedProvider } from '@apollo/react-testing';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import AccountOptions from './AccountOptions';

describe('BitcoinBalance component', () => {
  afterEach(cleanup);

  it('renders without crashing', async () => {
    const history = createMemoryHistory();
    const { getByTestId, debug } = render(
      <MockedProvider>
        <Router location={history.location} navigator={history}>
          <AccountOptions />
        </Router>
      </MockedProvider>
    );
  });
});
