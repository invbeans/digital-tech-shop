// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgres',
    connection: {
      host: 'localhost',
      database: 'postgres',
      user:     'postgres',
      password: 'admin'
    },
    seeds: {
      directory: './seeds'
    }
  },

  staging: {
    client: 'postgres',
    connection: {
      database: 'postgres',
      user:     'postgres',
      password: 'admin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgres',
    connection: {
      database: 'postgres',
      user:     'postgres',
      password: 'admin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
