// * Would be typically be seperate files in a resolver folder but kept in one file because of small project size

import { gql } from '@apollo/client';

// Fragments
const USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    email
    firstName
    lastName
    btcAddress
    btcWalletName
  }
`;

// Queries
export const USER_QUERY = gql`
  query User($email: String!) {
    user(email: $email) {
      user {
        ...UserFields
      }
      errors {
        message
        field
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const ME_QUERY = gql`
  query Me {
    me {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;

export const PLAID_LINK_QUERY = gql`
  query PlaidLink {
    plaidLink
  }
`;

export const ACCOUNT_BALANCES_QUERY = gql`
  query AccountBalances($publicToken: String!) {
    accountBalances(publicToken: $publicToken) {
      account_id
      balances {
        available
        current
        iso_currency_code
        limit
        unofficial_currency_code
      }
      name
      official_name
      subtype
      type
    }
  }
`;

export const BITCOIN_BALANCE_QUERY = gql`
  query BitcoinBalance($walletName: String!) {
    bitcoinBalance(walletName: $walletName)
  }
`;

// Mutations
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($options: CreateUserOptions!) {
    createUser(options: $options) {
      user {
        ...UserFields
      }
      errors {
        message
        field
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const LOGIN_MUTATION = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      user {
        ...UserFields
      }
      errors {
        message
        field
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const SEND_TO_ADDRESS_MUTATION = gql`
  mutation SendToAddress($options: SendToAddressOptions!) {
    sendToAddress(options: $options)
  }
`;
