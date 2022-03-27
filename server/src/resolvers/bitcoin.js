import { gql } from 'apollo-server';
import bitcoinClient from 'bitcoin-core';

export const bitcoinTypeDefs = gql`
  input SendToAddressOptions {
    toAddress: String
    fromWallet: String
    amount: Float
  }
  type Query {
    bitcoinBalance(walletName: String!): Float
  }
  type Mutation {
    sendToAddress(options: SendToAddressOptions!): String
  }
`;

export const BitcoinResolver = {
  Query: {
    bitcoinBalance: async (_, { walletName }) => {
      const initialClient = new bitcoinClient({
        network: 'regtest',
        username: process.env.BITCOIN_USER,
        password: process.env.BITCOIN_PASS,
        port: process.env.BITCOIN_PORT,
        host: process.env.BITCOIN_HOST,
        wallet: walletName,
      });

      const balance = await initialClient.getBalance();

      // Would handle error properly
      if (balance.message) {
        console.error(getBalanceResponse);
      }
      return balance;
    },
  },
  Mutation: {
    sendToAddress: async (_, { options }) => {
      const { toAddress, fromWallet, amount } = options;
      if (amount === 0) {
        return;
      }
      
      const client1 = new bitcoinClient({
        network: 'regtest',
        username: process.env.BITCOIN_USER,
        password: process.env.BITCOIN_PASS,
        port: process.env.BITCOIN_PORT,
        host: process.env.BITCOIN_HOST,
        wallet: fromWallet,
      });

      const sendToAddress = await client1.sendToAddress(
        toAddress,
        amount.toFixed(8),
        'purchase',
        'quantum_wallet'
      );

      // handle error properly
      if (sendToAddress.message) {
        console.log('sendToAddress', sendToAddress);
        console.error(sendToAddress);
      }

      const confirmTx = await client1.generateToAddress(
        1,
        'bcrt1qj2hh9kre29sz83h0l7t6q6wxuj8624tcq74jz8' // "main" address
      );

      // handle error properly
      if (confirmTx.message) {
        console.error(confirmTx);
      }

      return confirmTx[0];
    },
  },
};
