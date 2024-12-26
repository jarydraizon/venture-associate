
const { Pool } = require('pg');

// Create a new connection pool to the database
// This is more efficient than creating new connections for every request
const pool = new Pool({
  // Use the connection string from environment variables
  connectionString: process.env.DATABASE_URL,
  // Configure SSL settings for secure connection
  ssl: {
    rejectUnauthorized: false // Required for some PostgreSQL hosts
  },
  // Set maximum number of clients in the pool
  max: 20,
  // How long a client can be idle before being closed
  idleTimeoutMillis: 30000,
  // How long to wait for a connection from the pool
  connectionTimeoutMillis: 2000,
});

// Test the database connection
pool.on('connect', () => {
  console.log('Database connected successfully');
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

module.exports = pool;
