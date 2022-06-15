const { Pool } = require('pg')
const { db_info } = require('./config')

const { database, host, password, port, user } = db_info

const pool = new Pool({
  user,
  password,
  host,
  port,
  database,
})

module.exports = pool