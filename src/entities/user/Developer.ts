
import User from './User'
import Authenticator from '../authenticator/Authenticator'

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
}

export default Developer