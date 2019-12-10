// Update with your config settings.

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: process.env.DATABASE_HOST || '127.0.0.1',
            database: process.env.DATABASE_NAME || 'public',
            user: process.env.DATABASE_USERNAME || 'postgres',
            password: process.env.DATABASE_PASSWORD || 'pa55word'
        }
    },

    test: {
        client: 'postgresql',
        connection: {
            host: process.env.DATABASE_HOST || '127.0.0.1',
            database: process.env.DATABASE_NAME || 'public',
            user: process.env.DATABASE_USERNAME || 'postgres',
            password: process.env.DATABASE_PASSWORD || 'pa55word'
        }
    },

    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL + '?ssl=true'
    },

    pool: {
        min: 2,
        max: 10
    },

    migrations: {
        tableName: 'knex_migrations'
    }
};
