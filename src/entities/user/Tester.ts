
import User from './User'
import Authenticator from '../authenticator/authenticator'

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
}

export default Tester