import ProjectData from "./ProjectData";
import DataStoreGetter from "../dataStoreAccess/DataStoreGetter";
import QueryResponse from "../QueryResponse";
import UserFactory from "../user/UserFactory";


export default class Project{
    private projectData
    private dataStore 
    = new DataStoreGetter()
    .getAccordingToEnv()

    constructor(projectData:ProjectData){
        this.projectData = projectData
    }

    async create(){
        const {
            project,
            users
        } = this.projectData

        const projectId = project.id

        const projectSaveResponse
        = await this
        .saveProjectToDataStore(project)

        const userSave 
        = projectSaveResponse.success
        ? await this
        .saveProjectIdToUsers(projectId, users)
        : projectSaveResponse

        return userSave.success
        ? await this.getProjectWithId(projectId)
        : userSave
    }

    private async getProjectWithId(projectId){
        const refSetResponse = await this
        .dataStore.setIfNotCreateRef('projects')

        const projectFetch 
        = refSetResponse.success
        ? await this.dataStore
        .readWhere({id:projectId})
        : refSetResponse

        if(projectFetch.success 
            && projectFetch.data.length > 0){
                projectFetch.data = projectFetch.data[0]
        }

        return projectFetch
    }

    private async saveProjectToDataStore(project){
        const refSetResponse = await this
        .dataStore.setIfNotCreateRef('projects')

        return refSetResponse.success
        ? await this.dataStore.write(project)
        : refSetResponse
    }

    private async saveProjectIdToUsers(projectId, userIds){
        let saveProjectIdsSuccess = true

        const dataStore = new DataStoreGetter()
        .getAccordingToEnv()

        const setRefRes = await dataStore
        .setIfNotCreateRef(`"project_${projectId}_users"`)

        userIds.forEach(async (userId)=>{
            const user = await this
            .getUserWith(userId)

            if(user){
                const saveResponse
                =await user.addProjectWithId(projectId)

                
                const userToProjectRes = setRefRes.success
                ? await dataStore
                .write({userId: user.getData().data.accountData.id})
                : setRefRes

                saveProjectIdsSuccess
                = saveProjectIdsSuccess
                && saveResponse.success
                && userToProjectRes.success
            }
        })

        return {
            success: saveProjectIdsSuccess,
            data:null
        }
    }

    private async getUserWith(userId){
        try {
            return await new UserFactory()
            .retrieveWithUserId(userId)
        } 
        catch (error) {
            console.log(error)
            return false
        }
    }
}