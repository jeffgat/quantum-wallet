import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Flex, Link } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext } from '../contexts.js';
import { LOGOUT_MUTATION } from '../resolvers.js';

const linkStyle = {
  fontWeight: '600',
  mx: '4',
  color: 'gray.800',
};

const Nav = () => {
  const [logout] = useMutation(LOGOUT_MUTATION);
  const user = useContext(UserContext);
  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    await logout();
    await apolloClient.resetStore();
  };
  return (
    <Flex p={2} bg='white'>
      <Link {...linkStyle} as={RouterLink} to='/'>
        Home
      </Link>
      {user ? (
        <Button {...linkStyle} variant='link' onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Flex data-testid='auth_nav_links'>
          <Link {...linkStyle} as={RouterLink} to='/signup'>
            Sign Up
          </Link>
          <Link {...linkStyle} as={RouterLink} to='/login'>
            Login
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default Nav;
