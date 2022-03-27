import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Text
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts.js';
import {
  BITCOIN_BALANCE_QUERY,
  SEND_TO_ADDRESS_MUTATION
} from '../resolvers.js';

// Helpers
const format = val => `$` + val;
const parse = val => val.replace(/^\$/, '');

const AccountOptions = ({ plaidData, bitcoinPrice }) => {
  const [amount, setAmount] = useState('0.00');
  const [account, setAccount] = useState('0');
  const [error, setError] = useState(false);
  const [sendToAddress] = useMutation(SEND_TO_ADDRESS_MUTATION);
  const user = useContext(UserContext);

  const validAccountTypes = ['checking', 'savings'];
  const selectedBalance =
    plaidData?.accountBalances[parseFloat(account)].balances.available || 0;

  useEffect(() => {
    if (selectedBalance < parseFloat(amount)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [amount, selectedBalance]);

  const handlePurchase = async () => {
    try {
      await sendToAddress({
        variables: {
          options: {
            toAddress: user.btcAddress,
            fromWallet: 'main',
            amount: parseFloat(amount) / bitcoinPrice || 0,
          },
        },
        refetchQueries: [BITCOIN_BALANCE_QUERY, 'BitcoinBalance'],
      });
    } catch (err) {
      // handle errors here
      console.log('err', err);
    }
  };

  return (
    <Box>
      <RadioGroup onChange={setAccount} value={account}>
        {plaidData?.accountBalances.map((account, idx) => {
          const { account_id, name, balances } = account;
          if (validAccountTypes.includes(account.subtype)) {
            // console.log('account', account);
            return (
              <Box
                border='solid 1px'
                mb={4}
                borderColor='gray.200'
                rounded='md'
                key={account_id}
              >
                <Radio
                  value={idx.toString()}
                  p={4}
                  m={2}
                  w='400px'
                  border='solid 1px'
                  borderColor='gray.200'
                  rounded='md'
                >
                  <Heading variant='h3' fontSize={18}>
                    {name}
                  </Heading>
                  <Text>
                    {`$${balances.available.toFixed(2)}`}{' '}
                    <Text as='span' fontSize={12}>
                      {balances.iso_currency_code}
                    </Text>
                  </Text>
                </Radio>
              </Box>
            );
          } else return null;
        })}
      </RadioGroup>

      <Box mt={8}>
        <Heading variant='h4' fontSize={18} textAlign='center'>
          How much would you like to buy?
        </Heading>
        <Flex align='center' justify='center' mt={4}>
          <NumberInput
            onChange={amountString => setAmount(parse(amountString))}
            value={format(amount)}
            max={selectedBalance}
          >
            <NumberInputField />
          </NumberInput>
          <Button
            isDisabled={error}
            colorScheme='purple'
            ml={4}
            onClick={handlePurchase}
            w='100%'
          >
            Buy Bitcoin
          </Button>
        </Flex>
        <Text mt={2} textAlign='center'>
          = {parseFloat(amount) / bitcoinPrice} BTC
        </Text>
        {error && (
          <Text
            bg='red.100'
            color='red.700'
            fontSize={14}
            fontWeight={600}
            p={4}
            mt={4}
            rounded='md'
          >
            Insufficient funds in bank!
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default AccountOptions;
