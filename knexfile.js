module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: 'localhost',
        database: 'DB_Portfolio',
        user:     'root',
        password: ''
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  };
  