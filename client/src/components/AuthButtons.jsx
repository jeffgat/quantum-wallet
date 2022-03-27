import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const AuthButtons = () => (
  <Flex justify='center' data-testid='auth_buttons'>
    <Button as={RouterLink} colorScheme='purple' to='/signup'>
      Sign Up
    </Button>
    <Button as={RouterLink} ml={4} color='white' colorScheme='blue' to='/login'>
      Login
    </Button>
  </Flex>
);
export default AuthButtons;
