import Admin from "./user/Admin"
import Developer from "./user/Developer"
import Tester from "./user/Tester"
import ProjectManager from "./user/ProjectManager"

class UserFactory{
    userTypes:Array<string>

    createUserFromData(userData:any){
        const type = userData
        .accountData
        .role

        switch (type) {
            case 'admin':
                return new Admin(userData)
            
            case 'developer':
                return new Developer(userData)
        
            case 'tester':
                return new Tester(userData)

            case 'projectManager':
                return new ProjectManager(userData)

            default:
                throw new Error('Invalid user type')
        }
    }
}

export default UserFactory