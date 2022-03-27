import { Box, Center, Heading, Icon } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { IoWallet } from 'react-icons/io5';
import { UserContext } from '../contexts';
import AuthButtons from './AuthButtons';
import Wallet from './Wallet';

const Home = () => {
  const user = useContext(UserContext);

  return (
    <Center h='100vh'>
      <Box textAlign='center'>
        <Icon as={IoWallet} color='purple.200' w={16} h={16} />
        <Heading color='white' mb={4} fontSize={32} variant='h1'>
          Quantum Wallet
        </Heading>
        {user ? <Wallet /> : <AuthButtons />}
      </Box>
    </Center>
  );
};

export default Home;
