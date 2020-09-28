
import UserFactory from '../entities/UserFactory'
import User from '../entities/user/User'

const invalidUserResponse = {
    success:false,
    data: 'Invalid UserData provided to UserFactory'
}

class Interactors {
    userFactory = new UserFactory()

    async signUp(userData:any){
        try {
            const user:any = this
            .userFactory
            .createUserFromData(userData)

            const res = await user.signUp()
            return res
        } 
        catch (error) {
            console.log(error)
            return invalidUserResponse
        }
    }

    async loginWithEmailPassword(loginCred){
        try {
            const user:any = await this
            .userFactory
            .retrieveWithEmailPassword(loginCred)

            return await user.login()
        } 
        catch (error) {
            console.log(error)
            return invalidUserResponse
        }
    }

    async checkUserLogin(userId){
        try {
            const user:any = await this
            .userFactory
            .retrieveWithUserId(userId)

            return await user.checkIsLoggedIn()
        } 
        catch (error) {
            console.log(error)
            return invalidUserResponse
        }
    }

    async removeUser(deletionData){
        try {
            const {deleterId, deleteeId}
            = deletionData

            const deleleter = await this
            .userFactory
            .retrieveWithUserId(deleterId)

            const deletee = await this
            .userFactory
            .retrieveWithUserId(deleteeId)

            const deleterIsAdmin
            = deleleter.getRole() === 'admin'

            if(deleterIsAdmin){
                return await 
                deletee.delete()
            }

            return {
                success: false,
                data: 'Deleter is not admin'
            }
        } 
        catch (error) {
            console.log(error)
            return invalidUserResponse
        }
    }
}

export default Interactors