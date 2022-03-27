import { useQuery } from '@apollo/client';
import { Box, Spinner, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '../contexts';
import { BITCOIN_BALANCE_QUERY } from '../resolvers.js';

const BitcoinBalance = () => {
  const user = useContext(UserContext);
  const { data, loading } = useQuery(BITCOIN_BALANCE_QUERY, {
    variables: { walletName: user?.btcWalletName },
  });

  const balance = data?.bitcoinBalance || 0;

  return (
    <Box bg='purple.100' rounded='md' p={4} mb={4}>
      <Text fontSize={14} fontWeight={600}>
        Your BTC balance:
      </Text>
      {loading ? (
        <Spinner mt={2} data-testid='bitcoin_balance_loading' />
      ) : (
        <Text fontSize={24} fontWeight={800} textTransform='uppercase'>
          {balance}
          <Text as='span' fontSize={14}>
            {' '}
            btc
          </Text>
        </Text>
      )}
    </Box>
  );
};

export default BitcoinBalance;
