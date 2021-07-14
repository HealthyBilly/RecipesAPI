const { Pool } = require('pg');
const config = require('../../config.js')

const pool = new Pool({
  host: config.host,
  use: config.user,
  password: config.password,
  adatabase: config.database,
  port: 5432,
});

module.exports = pool;