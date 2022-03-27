import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import path, { dirname } from 'path';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import 'reflect-metadata';
import { createConnection, getManager } from 'typeorm';
import { fileURLToPath } from 'url';
import { COOKIE_NAME, __prod__ } from './constants.js';
import { UserEntity } from './entities.js';
import { BitcoinResolver, bitcoinTypeDefs } from './resolvers/bitcoin.js';
import { PlaidResolver, plaidTypeDefs } from './resolvers/plaid.js';
import { UserResolver, userTypeDefs } from './resolvers/user.js';

const main = async () => {
  const {
    DATABASE_URL,
    PORT,
    REDIS_URL,
    SESSION_SECRET,
    PLAID_SECRET,
    PLAID_CLIENT_ID,
    CORS_ORIGIN,
  } = process.env;

  const app = express();
  app.use(express.json());
  const redis = new Redis(REDIS_URL);
  const RedisStore = connectRedis(session);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // TypeORM Connection
  const conn = await createConnection({
    type: 'postgres',
    url: DATABASE_URL, // env var for dev
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [UserEntity],
  });
  await conn.runMigrations();
  const entityManager = getManager();

  // Plaid connection
  const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
        'PLAID-SECRET': PLAID_SECRET,
      },
    },
  });
  const plaidClient = new PlaidApi(configuration);

  app.set('trust proxy', 1);
  const corsOptions = {
    origin: CORS_ORIGIN,
    credentials: true,
    maxAge: 86400,
  };

  // Redis Connection
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
      }),
      cookie: {
        maxAge: 60 * 60 * 24 * 7000, // 1 week
        httpOnly: true, // only accessed by server
        sameSite: 'none',
        secure: __prod__,
        domain: __prod__ ? 'jeff-apps.com' : undefined, // probably put in an env var
      },
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false,
    })
  );

  // Apollo Connection
  const apolloServer = new ApolloServer({
    typeDefs: [userTypeDefs, plaidTypeDefs, bitcoinTypeDefs],
    resolvers: [UserResolver, PlaidResolver, BitcoinResolver],
    plugins: [ApolloServerPluginLandingPageLocalDefault],
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      entityManager,
      plaidClient,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: corsOptions });

  app.listen(parseInt(PORT), () => {
    console.log(`Server Started on PORT: ${PORT}`);
    console.log(new Date(Date.now()).toUTCString());
  });

  return { apolloServer, app };
};

main().catch(err => {
  console.log(err);
});
