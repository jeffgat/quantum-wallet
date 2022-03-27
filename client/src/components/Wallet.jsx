import { useLazyQuery, useQuery } from '@apollo/client';
import { Box, Button, Divider, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { ACCOUNT_BALANCES_QUERY, PLAID_LINK_QUERY } from '../resolvers.js';
import AccountOptions from './AccountOptions.jsx';
import BitcoinBalance from './BitcoinBalance.jsx';

const Wallet = () => {
  const [bitcoinPrice] = useState(85.99);
  const { data: linkData, loading: linkLoading } = useQuery(PLAID_LINK_QUERY);
  const [getAccountBalances, { data: plaidData, loading: plaidLoading }] =
    useLazyQuery(ACCOUNT_BALANCES_QUERY, {
      skip: linkLoading,
    });

  const { open, ready } = usePlaidLink({
    token: linkData?.plaidLink,
    onSuccess: public_token => {
      getAccountBalances({ variables: { publicToken: public_token } });
    },
  });

  return (
    <Box>
      <BitcoinBalance />
      {plaidData ? (
        <Box bg='white' rounded='md' p={4} textAlign='left'>
          <Text fontSize={18} fontWeight={700} textAlign='center'>
            {`1 BTC = $${bitcoinPrice} USD`}
          </Text>

          <Divider mt={4} mb={8} />
          <AccountOptions plaidData={plaidData} bitcoinPrice={bitcoinPrice} />
        </Box>
      ) : (
        <>
          {plaidLoading ? (
            <Spinner color='white' size='xl' />
          ) : (
            <>
              <Button
                data-testid='connect_bank_button'
                colorScheme='purple'
                onClick={() => open()}
                disabled={!ready}
              >
                Connect Bank
              </Button>
              <Text fontStyle='italic' color='white' mt={2}>
                Login to your bank account to start buying crypto!
              </Text>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Wallet;
