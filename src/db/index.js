const pgp = require("pg-promise");
const promise = require("bluebird");
require("dotenv").config();

const dbURL = process.env.DATABASE_URL ;

const pg = pgp({ promiseLib: promise, noWarnings: true });
const db = pg(dbURL);

module.exports = { db };
