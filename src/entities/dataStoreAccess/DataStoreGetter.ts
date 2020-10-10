import TestDataStoreAccess from "./TestDataStoreAccess";
import PgDataStoreAccess from './PgDataStoreAccess'
import * as dotenv from 'dotenv'

dotenv.config()

class DataStoreGetter{
    getAccordingToEnv(){
        return process.env.NODE_ENV === 'test'
        ? new TestDataStoreAccess()
        : new PgDataStoreAccess()
    }
}

export default DataStoreGetter