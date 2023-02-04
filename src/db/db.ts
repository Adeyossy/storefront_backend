import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  PG_HOST, PG_DB, PG_USER, PG_PASSWORD
} = process.env;

let db: Pool;

if(process.env.ENV === 'dev'){
  db = new Pool({
    database: PG_DB
  });
} else {
  db = new Pool();
}

export default db;