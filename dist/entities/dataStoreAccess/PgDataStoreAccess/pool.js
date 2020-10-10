"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const connectionString = `postgressql://${user}:${password}@${host}:${port}/${database}`;
console.log(connectionString);
const pool = new pg_1.Pool({
    connectionString: connectionString,
    max: 20,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
});
exports.default = pool;
