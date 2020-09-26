
import User from './User'
import Authenticator from '../authenticator/authenticator'

class Admin implements User{
    userData:any

    constructor(userData){
        this.userData = userData
    }

    async signUp(){
        return await 
        new Authenticator()
        .signUpAdmin(this.userData)
    }
}

export default Admin