import { Box, Center, Heading, Icon } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { IoWallet } from 'react-icons/io5';
import SignupForm from './SignupForm';

const Signup = () => {
  const methods = useForm();

  return (
    <Center h='100vh'>
      <Box textAlign='center'>
        <Icon as={IoWallet} color='purple.200' w={16} h={16} />
        <Heading color='white' mb={4} fontSize={32}>
          Sign Up Form
        </Heading>
        <Box bg='white' p={4} rounded='md'>
          <SignupForm methods={methods} />
        </Box>
      </Box>
    </Center>
  );
};

export default Signup;
