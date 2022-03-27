import { MockedProvider } from '@apollo/react-testing';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import Wallet from './Wallet';

describe('Wallet component', () => {
  afterEach(cleanup);

  it('renders connect bank button by default', async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MockedProvider>
        <Router location={history.location} navigator={history}>
          <Wallet />
        </Router>
      </MockedProvider>
    );

    const connectBankButton = getByTestId('connect_bank_button');
    expect(connectBankButton).toBeInTheDocument();
  });
});
