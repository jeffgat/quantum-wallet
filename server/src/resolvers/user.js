import { gql } from 'apollo-server';
import argon2 from 'argon2';
import bitcoinClient from 'bitcoin-core';
import { v4 as uuid } from 'uuid';
import { COOKIE_NAME } from '../constants.js';
import { UserEntity } from '../entities.js';

export const userTypeDefs = gql`
  scalar Date
  type User {
    id: ID
    email: String
    firstName: String
    lastName: String
    createdAt: Date
    updatedAt: Date
    btcAddress: String
    btcWalletName: String
  }
  input CreateUserOptions {
    email: String
    password: String
    firstName: String
    lastName: String
  }
  type Error {
    field: String
    message: String
  }
  type UserResponse {
    user: User
    errors: [Error]
  }
  type Query {
    user(email: String!): UserResponse
    me: User
  }
  type Mutation {
    createUser(options: CreateUserOptions!): UserResponse
    login(email: String!, password: String!): UserResponse
    logout: Boolean
  }
`;

export const UserResolver = {
  Query: {
    // (parent, args, context, info)
    user: async (_, { email }, { entityManager }) => {
      const user = await entityManager.findOne(UserEntity, { email });
      return { user };
    },
    me: async (_, __, { entityManager, req }) => {
      if (!req.session.userId) {
        return null;
      }

      return entityManager.findOne(UserEntity, { id: req.session.userId });
    },
  },
  Mutation: {
    createUser: async (_, { options }, { entityManager, req }) => {
      const errors = [];
      const { email, password, firstName, lastName } = options;

      if (!email.includes('@')) {
        errors.push({ field: 'email', message: 'Email is invalid' });
        return { errors };
      }

      const client1 = new bitcoinClient({
        network: 'regtest',
        username: process.env.BITCOIN_USER,
        password: process.env.BITCOIN_PASS,
        port: process.env.BITCOIN_PORT,
        host: process.env.BITCOIN_HOST,
      });

      const hashedPassword = await argon2.hash(password);

      const newWallet = await client1.createWallet(uuid());

      const client2 = new bitcoinClient({
        network: 'regtest',
        username: process.env.BITCOIN_USER,
        password: process.env.BITCOIN_PASS,
        port: process.env.BITCOIN_PORT,
        host: process.env.BITCOIN_HOST,
        wallet: newWallet.name,
      });
      
      const newAddress = await client2.getNewAddress();
      
      try {
        await entityManager.insert(UserEntity, {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          btcAddress: newAddress,
          btcWalletName: newWallet.name,
        });
      } catch (err) {
        if (err.code === '23505') {
          errors.push({ field: 'email', message: 'Email already in use' });
          return { errors };
        }
      }

      const user = await entityManager.findOne(UserEntity, { email });

      req.session.userId = user.id;
      return { user };
    },

    login: async (_, { email, password }, { entityManager, req }) => {
      const errors = [];

      const user = await entityManager.findOne(UserEntity, { email });
      if (!user) {
        errors.push({ field: 'email', message: 'Account does not exist' });
        return { errors };
      }

      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword) {
        errors.push({ field: 'password', message: 'Incorrect password' });
        return { errors };
      }

      req.session.userId = user.id;
      return { user };
    },

    logout: (_, __, { req, res }) => {
      return new Promise(resolve =>
        req.session.destroy(err => {
          res.clearCookie(COOKIE_NAME);
          if (err) {
            console.error('[logout] error', err);
            resolve(false);
          }
          resolve(true);
          return true;
        })
      );
    },
  },
};
