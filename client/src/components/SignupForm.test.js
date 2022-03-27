import { MockedProvider } from '@apollo/react-testing';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Router } from 'react-router-dom';
import SignupForm from './SignupForm';

const SignupFormWrapper = () => {
  const methods = useForm();
  return <SignupForm methods={methods} />;
};

describe('SignupForm component', () => {
  afterEach(cleanup);

  it('renders form', async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MockedProvider>
        <Router location={history.location} navigator={history}>
          <SignupFormWrapper />
        </Router>
      </MockedProvider>
    );
    const form = getByTestId('signup_form');
    expect(form).toBeInTheDocument();
  });
});
