import { useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { UserContext } from '../contexts.js';
import { ME_QUERY } from '../resolvers.js';
import Nav from './Nav';

const Layout = ({ children }) => {
  const { data } = useQuery(ME_QUERY);

  return (
    <UserContext.Provider value={data?.me}>
      <Box bg='gray.700'>
        <Nav />
        {children}
      </Box>
    </UserContext.Provider>
  );
};

export default Layout;
