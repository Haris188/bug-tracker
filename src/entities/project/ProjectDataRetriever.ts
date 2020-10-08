import DataStoreGetter from "../dataStoreAccess/DataStoreGetter";
import UserFactory from "../user/UserFactory";

export default class ProjectDataRetriever{
    async getUsersForProject(projectId){
        const dataStore = new DataStoreGetter()
        .getAccordingToEnv()

        const setRefRes = await 
        dataStore
        .setIfNotCreateRef(`"project_${projectId}_users"`)

        return setRefRes.success
        ? await dataStore.readWhere({})
        : setRefRes
    }
}