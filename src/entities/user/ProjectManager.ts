
import User from './User'
import Authenticator from '../authenticator/Authenticator'

class ProjectManager implements User{
    userData:any

    constructor(userData){
        this.userData = userData
    }

    async signUp(){
        return await
        new Authenticator()
        .signUpProjectManager(this.userData)
    }

    async login(){
        return await
        new Authenticator()
        .signInAsProjectManager(this.userData)
    }
}

export default ProjectManager