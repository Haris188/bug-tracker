
import User from './User'
import Authenticator from '../authenticator/Authenticator'

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

    async login(){
        return await
        new Authenticator()
        .signInAsAdmin(this.userData)
    }
}

export default Admin