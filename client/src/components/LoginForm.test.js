import { MockedProvider } from '@apollo/react-testing';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Router } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginFormWrapper = () => {
  const methods = useForm();
  return <LoginForm methods={methods} />;
};

describe('LoginForm component', () => {
  afterEach(cleanup);

  it('renders form', async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MockedProvider>
        <Router location={history.location} navigator={history}>
          <LoginFormWrapper />
        </Router>
      </MockedProvider>
    );
    const form = getByTestId('login_form');
    expect(form).toBeInTheDocument();
  });
});
