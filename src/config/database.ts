import knex, { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const { DB_CLIENT, DB_URL } = process.env;

const knexConfig: Knex.Config = {
  client: DB_CLIENT,
  connection: {
    connectionString: DB_URL,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/modules/*/migrations',
  },
};

const knexInstance = knex(knexConfig);

export default knexInstance;
