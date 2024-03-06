module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: 'localhost',
        database: 'DB_Portfolio',
        user:     'root',
        password: '',
        charset: 'utf8mb4'
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  };
  