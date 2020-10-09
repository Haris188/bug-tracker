
import User from './User'
import Authenticator from '../authenticator/Authenticator'
import DataStoreGetter from '../dataStoreAccess/DataStoreGetter'
import UserData from './UserData'
import TicketDataRetriever from '../ticket/TicketDataRetriever'

class Tester implements User{
    private userData:any
    private dataStore
    = new DataStoreGetter()
    .getAccordingToEnv()

    constructor(userData:UserData){
        this.userData = userData
    }

    async signUp(){
        return await 
        new Authenticator()
        .signUpTester(this.userData)
    }

    async login(){
        return await
        new Authenticator()
        .signInAsTester(this.userData)
    }

    async delete(){
        const accountDeleteResponse
        = await this.deleteAccountInfo()

        const userSpecificDeleteResponse
        = accountDeleteResponse.success
        ? await this.deleteUserSpecificInfo()
        : accountDeleteResponse

        return userSpecificDeleteResponse
    }

    async addProjectWithId(projectId){
        const dataStore
        = new DataStoreGetter()
        .getAccordingToEnv()

        const userId = this.userData.accountData.id

        const refResponse = await dataStore
        .setIfNotCreateRef(`"id_${userId}_projects"`)

        return refResponse.success
        ? await dataStore.write({
            projectId
        })
        : refResponse
    }

    async getAllProject(){
        const projectIds = await
        this.getAllProjectIds()

        return projectIds.success
        ? {success: true, data: await this
            .getProjectsWithIds(projectIds.data)}
        : projectIds
    }

    async getTicketsForProject(projectId){
        const ticketRetriever 
        = new TicketDataRetriever()

        return await 
        ticketRetriever
        .getAllTicketsWhere({
            userid: this.userData.accountData.id,
            projectid: projectId
        })
    }

    getRole(){
        return this.userData
        .accountData.role
    }

    getData(){
        return this.userData 
        ? {
            success: true,
            data: this.userData
          }
        : {
            success:false,
            data:null
          }
    }

    private async getAllProjectIds(){
        const userId = this.userData.accountData.id

        const setRefResponse = await
        this.dataStore
        .setIfNotCreateRef(`"id_${userId}_projects"`)

        return setRefResponse.success
        ? await this.dataStore
          .readWhere({})
        : setRefResponse
    }

    private async getProjectsWithIds(ids){
        const setRefResponse =await
        this.dataStore
        .setIfNotCreateRef('projects')

        const projects = ids.map(async (currentId)=>{
            const project = await this
            .dataStore
            .readWhere({id:currentId.projectid})

            return project.data[0]
        })

        const resolved = await
        Promise.all(projects)

        return setRefResponse.success
        ? {success:true, data: resolved}
        : setRefResponse
    }

    private async deleteAccountInfo(){
        const dataStore 
        = new DataStoreGetter()
        .getAccordingToEnv()

        const refResponse = await dataStore
        .setIfNotCreateRef('accounts')

        return refResponse
        ? await dataStore.deleteWhere({
            id: this.userData.accountData.id
        })
        : refResponse
    }

    private async deleteUserSpecificInfo(){
        const dataStore 
        = new DataStoreGetter()
        .getAccordingToEnv()

        const refResponse = await dataStore
        .setIfNotCreateRef('testers')

        return refResponse
        ? await dataStore.deleteWhere({
            userId: this.userData.accountData.id
        })
        : refResponse
    }
}

export default Tester