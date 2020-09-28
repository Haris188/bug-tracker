
import User from './User'
import Authenticator from '../authenticator/Authenticator'
import DataStoreGetter from '../dataStoreAccess/DataStoreGetter'

class Developer implements User{
    userData:any

    constructor(userData){
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

    async checkIsLoggedIn(){
        return await
        new Authenticator()
        .checkIsLoggedInOfUserWithId(
            this
            .userData
            .accountData
            .id
        )
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
            id: this.userData.accountData.id
        })
        : refResponse
    }
}

export default Developer