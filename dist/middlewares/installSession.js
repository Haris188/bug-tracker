"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session = require("express-session");
const ConnectPgSimple = require("connect-pg-simple");
const pool_1 = require("../entities/dataStoreAccess/PgDataStoreAccess/pool");
const uuid_1 = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const HOUR = 60 * 60 * 1000;
const PgStore = ConnectPgSimple(session);
const { SESSION_SECRET } = process.env;
if (!SESSION_SECRET) {
    throw new Error("Server misconfigured");
}
exports.default = (app) => {
    const store = new PgStore({
        pool: pool_1.default,
        tableName: 'session'
    });
    const sessionMiddleware = session({
        genid: (req) => {
            console.log('SESSION ID');
            console.log(req.session);
            console.log(req.sessionID);
            return uuid_1.v4(); // use UUIDs for session IDs
        },
        store,
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: HOUR,
            secure: true,
            sameSite: 'none',
            httpOnly: false
        }
    });
    app.set('trust proxy', 1); // trust first proxy
    app.use(sessionMiddleware);
};
