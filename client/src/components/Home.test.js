import { MockedProvider } from '@apollo/react-testing';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import Home from './Home';

describe('Home screen', () => {
  afterEach(cleanup);

  it('renders AuthButtons by default', async () => {
    const history = createMemoryHistory();
    const { debug, getByTestId } = render(
      <MockedProvider>
        <Router location={history.location} navigator={history}>
          <Home />
        </Router>
      </MockedProvider>
    );

    const authButtons = getByTestId('auth_buttons');
    expect(authButtons).toBeInTheDocument();
  });
});
