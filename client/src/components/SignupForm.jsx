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
import { CREATE_USER_MUTATION, ME_QUERY } from '../resolvers.js';

const formLabelStyle = {
  fontSize: 14,
};

const SignupForm = ({ methods }) => {
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [createUserErrors, setCreateUserErrors] = useState(null);
  const { register, handleSubmit } = methods;

  const onSubmit = async data => {
    const response = await createUser({
      variables: { options: data },
      refetchQueries: [ME_QUERY, 'Me'],
    });
    const { errors } = response.data.createUser;

    if (errors) {
      setCreateUserErrors(errors);
    }
  };

  return (
    <form data-testid='signup_form' onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={2} spacing={4}>
        <FormControl isRequired>
          <FormLabel {...formLabelStyle} htmlFor='firstName'>
            First Name
          </FormLabel>
          <Input
            placeholder='First Name'
            type='text'
            {...register('firstName', {
              required: true,
            })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel {...formLabelStyle} htmlFor='lastName'>
            Last Name
          </FormLabel>
          <Input
            placeholder='Last Name'
            type='text'
            {...register('lastName', { required: true })}
          />
        </FormControl>
        <GridItem colSpan={2}>
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
        </GridItem>
        <GridItem colSpan={2}>
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
        </GridItem>
        <GridItem colSpan={2}>
          {createUserErrors !== null &&
            createUserErrors.map(error => (
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
      <Button
        data-testid='signup_form_button'
        mt={4}
        w='100%'
        colorScheme='purple'
        type='submit'
      >
        Next
      </Button>
    </form>
  );
};

export default SignupForm;
