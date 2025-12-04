import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tcit-cloud-prueba',
  password: '123456*',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Error in the database pool', err);
});

const query = (text, params) => pool.query(text, params);

export { pool, query };

export default {
  query,
  pool,
};