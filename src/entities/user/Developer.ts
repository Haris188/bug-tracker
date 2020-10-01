
import User from './User'
import Authenticator from '../authenticator/Authenticator'
import DataStoreGetter from '../dataStoreAccess/DataStoreGetter'
import UserData from './UserData'

class Developer implements User{
    private userData:any

    constructor(userData:UserData){
        this.userData = userData
    }

    async signUp(){
        return await 
        new Authenticator()
        .signUpDeveloper(this.userData)
    }

    async login(){
        return await
        new Authenticator()
        .signInAsDeveloper(this.userData)
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
        .setIfNotCreateRef(`id_${userId}_projects`)

        return refResponse.success
        ? await dataStore.write({
            projectId
        })
        : refResponse
    }

    getRole(){
        return this.userData
        .accountData.role
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
        .setIfNotCreateRef('developers')

        return refResponse
        ? await dataStore.deleteWhere({
            userId: this.userData.accountData.id
        })
        : refResponse
    }
}

export default Developer