
import User from './User'
import Authenticator from '../authenticator/authenticator'

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
}

export default Developer