
import User from './User'
import Authenticator from '../authenticator/Authenticator'

class Tester implements User{
    userData:any

    constructor(userData){
        this.userData = userData
    }

    async signUp(){
        return await 
        new Authenticator()
        .signUpTester(this.userData)
    }

    async login(){
        return await
        new Authenticator()
        .signInAsTester(this.userData)
    }
}

export default Tester