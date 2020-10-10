
import * as session from 'express-session'
import * as ConnectPgSimple from 'connect-pg-simple'
import pool from '../entities/dataStoreAccess/PgDataStoreAccess/pool'
import {v4 as uuid} from 'uuid'

import * as dotenv from 'dotenv'

dotenv.config();

const HOUR = 60*60*1000;

const PgStore = ConnectPgSimple(session)

const { SESSION_SECRET } = process.env;
if (!SESSION_SECRET) {
  throw new Error("Server misconfigured");
}

export default (app:any)=>{

    const store = new PgStore({
        pool,
        tableName: 'session'
    })

    const sessionMiddleware = session({
        genid: (req) => {
          console.log('SESSION ID')
          console.log(req.session)
          console.log(req.sessionID);
          return uuid() // use UUIDs for session IDs
        },
        store,
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie:{
          maxAge: HOUR,
          secure:true,
          sameSite: 'none'
        }
      })
    
    app.use(sessionMiddleware)
}
