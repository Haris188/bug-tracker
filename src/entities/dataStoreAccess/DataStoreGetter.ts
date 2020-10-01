import TestDataStoreAccess from "./TestDataStoreAccess";
import PgDataStoreAccess from './PgDataStoreAccess'

class DataStoreGetter{
    getAccordingToEnv(){
        return new PgDataStoreAccess()
    }
}

export default DataStoreGetter