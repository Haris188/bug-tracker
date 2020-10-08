import DataStoreGetter from "../dataStoreAccess/DataStoreGetter";

export default class UserDataRetriever{
    async getAllUsers(){
        const DataStore 
        = new DataStoreGetter()
        .getAccordingToEnv()
        
        const setRefResult = await
        DataStore
        .setIfNotCreateRef('accounts')

        return setRefResult.success
        ? await
          DataStore
          .readWhere({})
        : setRefResult
    }
}