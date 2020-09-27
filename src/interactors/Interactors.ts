
import UserFactory from '../entities/UserFactory'
import User from '../entities/user/User'

class Interactors {
    userFactory = new UserFactory()

    async signUp(userData:any){
        const user:any = this
        .userFactory
        .createUserFromData(userData)

        const res = await user.signUp()
        return res
    }

    async loginWithEmailPassword(loginCred){
        const user:any = await this
        .userFactory
        .retrieveWithEmailPassword(loginCred)

        return await user.login()
    }
}

export default Interactors