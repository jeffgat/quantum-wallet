import { MockedProvider } from '@apollo/react-testing';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import Nav from './Nav';

describe('Nav component', () => {
  afterEach(cleanup);

  it('renders auth nav links by default', async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MockedProvider>
        <Router location={history.location} navigator={history}>
          <Nav />
        </Router>
      </MockedProvider>
    );

    const navBar = getByTestId('auth_nav_links');
    expect(navBar).toBeInTheDocument();
  });
});
