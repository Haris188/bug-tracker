import Admin from "./user/Admin"
import Developer from "./user/Developer"
import Tester from "./user/Tester"
import ProjectManager from "./user/ProjectManager"
import DataStoreGetter from "./dataStoreAccess/DataStoreGetter"
import UserData from "./user/UserData"

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