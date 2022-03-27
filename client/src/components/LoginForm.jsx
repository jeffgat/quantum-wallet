import { useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { LOGIN_MUTATION, ME_QUERY } from '../resolvers.js';

const formLabelStyle = {
  fontSize: 14,
};

const LoginForm = ({ methods }) => {
  const { register, handleSubmit } = methods;
  const [login] = useMutation(LOGIN_MUTATION);
  const [loginErrors, setLoginErrors] = useState(null);

  const onSubmit = async data => {
    const response = await login({
      variables: data,
      refetchQueries: [ME_QUERY, 'Me'],
    });

    const { errors } = response.data.login;

    if (errors) {
      setLoginErrors(errors);
    }
  };

  return (
    <form data-testid='login_form' onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={2} spacing={4}>
        <FormControl isRequired>
          <FormLabel {...formLabelStyle} htmlFor='email'>
            Email
          </FormLabel>
          <Input
            placeholder='Email'
            type='text'
            {...register('email', { required: true })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel {...formLabelStyle} htmlFor='password'>
            Password
          </FormLabel>
          <Input
            placeholder='Password'
            type='password'
            {...register('password', { required: true })}
          />
        </FormControl>
        <GridItem colSpan={2}>
          {loginErrors !== null &&
            loginErrors.map(error => (
              <Text
                color='red.700'
                fontWeight={600}
                bg='red.100'
                p={2}
                rounded='md'
                key={error.message}
              >
                {error.message}
              </Text>
            ))}
        </GridItem>
      </SimpleGrid>
      <Button mt={4} w='100%' colorScheme='purple' type='submit'>
        Next
      </Button>
    </form>
  );
};

export default LoginForm;
