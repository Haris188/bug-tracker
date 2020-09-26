
import User from './User'
import Authenticator from '../authenticator/authenticator'

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
}

export default ProjectManager