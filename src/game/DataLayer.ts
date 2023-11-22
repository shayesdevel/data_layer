const knex = require('knex');
const knexfile = require('./knex/knexfile');
const configOptions = knexfile['development'];
module.exports = knex(configOptions);

class DataLayer {

    public static async connect(): Promise<boolean> {
            const connection = knex();
            await connection;
            return Promise.resolve(true);
    }
}

export { DataLayer }