import TestDataStoreAccess from "./TestDataStoreAccess";

class DataStoreGetter{
    getAccordingToEnv(){
        return new TestDataStoreAccess()
    }
}

export default DataStoreGetter