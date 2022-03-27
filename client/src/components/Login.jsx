import { Box, Center, Heading, Icon } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { IoWallet } from 'react-icons/io5';
import LoginForm from './LoginForm';

const Login = () => {
  const methods = useForm();
  return (
    <Center h='100vh'>
      <Box textAlign='center'>
        <Icon as={IoWallet} color='purple.200' w={16} h={16} />
        <Heading color='white' mb={4} fontSize={32}>
          Login Form
        </Heading>
        <Box bg='white' p={4} rounded='md'>
          <LoginForm methods={methods} />
        </Box>
      </Box>
    </Center>
  );
};

export default Login;
