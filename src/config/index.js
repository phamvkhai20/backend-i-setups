const { DB_HOST, DB_PORT } = process.env;
const config = {
  host: DB_HOST,
  port: DB_PORT,
};

module.exports = config;
