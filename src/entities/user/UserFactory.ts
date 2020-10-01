import Admin from "./Admin"
import Developer from "./Developer"
import Tester from "./Tester"
import ProjectManager from "./ProjectManager"
import DataStoreGetter from "../dataStoreAccess/DataStoreGetter"
import UserData from "./UserData"
import {v4 as uuid} from 'uuid'

class UserFactory{
    userTypes:Array<string>

    createUserFromData(userData:UserData){
        const type = userData
        .accountData
        .role

        switch (type) {
            case 'admin':
                return new Admin(userData)
            
            case 'developer':
                return new Developer(userData)
        
            case 'tester':
                return new Tester(userData)

            case 'projectManager':
                return new ProjectManager(userData)

            default:
                throw new Error('Invalid user type')
        }
    }

    async createUserFromDataWithId(userData){
        const id = uuid()
        let {accountData, userSpecificData} = userData

        accountData = {
            ...userData.accountData,
            id
        }

        userSpecificData = {
            ...userData.userSpecificData,
            userId: id
        }

        const idAttachedData = {
            ...userData,
            accountData,
            userSpecificData
        }

        return await this
        .createUserFromData(idAttachedData)
    }

    async retrieveWithEmailPassword(loginCred){
        const userDataResponse = await
        this.getUserDataFromAccountsWith(loginCred)

        return this.createUserFromData({
            accountData: userDataResponse.data[0],
            userSpecificData: {}
        })
    }


    async retrieveWithUserId(userId){
        const userDataResponse = await
        this.getUserDataFromAccountsWith({
            id: userId
        })

        return this.createUserFromData({
            accountData: userDataResponse.data[0],
            userSpecificData:{}
        })
    }

    async getUserDataFromAccountsWith(loginCred){
        const dataStore = await 
        new DataStoreGetter()
        .getAccordingToEnv()

        const refSetResponse = await 
        dataStore.setIfNotCreateRef('accounts')

        const accountData = refSetResponse.success
        ? await dataStore.readWhere(loginCred)
        : refSetResponse

        return accountData
    }
}

export default UserFactory