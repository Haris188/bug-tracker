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

        return projectSaveResponse.success
        ? await this
        .saveProjectIdToUsers(projectId, users)
        : projectSaveResponse
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

        userIds.forEach(async (userId)=>{
            const user = await this
            .getUserWith(userId)

            if(user){
                const saveResponse
                =await user.addProjectWithId(projectId)

                saveProjectIdsSuccess
                = saveProjectIdsSuccess
                && saveResponse.success
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