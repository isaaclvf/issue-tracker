const { Pool } = require('pg')
const { db_info } = require('./config')

const { database, host, password, port, user } = db_info

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  database,
  host,
  password,
  port,
  user
})

module.exports = pool