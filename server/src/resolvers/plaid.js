import { gql } from 'apollo-server';
import { Products } from 'plaid';

export const plaidTypeDefs = gql`
  type Error {
    field: String
    message: String
  }
  type Balances {
    available: Float
    current: Float
    iso_currency_code: String
    limit: Float
    unofficial_currency_code: String
  }
  type AccountBalance {
    account_id: String
    balances: Balances
    mask: String
    name: String
    official_name: String
    subtype: String
    type: String!
  }
  type Query {
    plaidLink: String
    accountBalances(publicToken: String!): [AccountBalance]
  }
`;

export const PlaidResolver = {
  Query: {
    plaidLink: async (_, __, { plaidClient }) => {
      const request = {
        user: {
          client_user_id: 'user-id',
        },
        client_name: 'Quantum Wallet',
        products: [Products.Auth],
        country_codes: ['US'],
        language: 'en',
        account_filters: {
          depository: {
            account_subtypes: ['checking', 'savings'],
          },
        },
      };
      try {
        const response = await plaidClient.linkTokenCreate(request);
        const linkToken = response.data.link_token;
        return linkToken;
      } catch (error) {
        console.log('error', error);
        // handle error
      }
    },
    accountBalances: async (_, { publicToken }, { plaidClient }) => {
      const test = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
      const request = {
        access_token: test.data.access_token,
      };
      try {
        const response = await plaidClient.accountsBalanceGet(request);
        const accounts = response.data.accounts;
        return accounts;
      } catch (error) {
        console.log(error);
        // handle error
      }
    },
  },
};
