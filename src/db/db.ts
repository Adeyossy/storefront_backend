import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  PGHOST, PGDBATABASE, PGUSER, PGPASSWORD, PGDATABASETEST
} = process.env;

let client: Pool;

if(process.env.ENV === 'dev'){
  client = new Pool({
    host: PGHOST,
    database: PGDBATABASE,
    user: PGUSER,
    password: PGPASSWORD
  });
} else { // process.env.ENV === 'test'
  // I initially used `client = new Pool();` 
  // Given that Pool uses default names if not specified
  // My reviewer noted I did not initialize pool properly so I am rewriting it

  client = new Pool({
    host: PGHOST,
    database: PGDATABASETEST,
    user: PGUSER,
    password: PGPASSWORD
  });
}

export default client;