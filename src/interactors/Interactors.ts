
import UserFactory from '../entities/user/UserFactory'
import ProjectFactory from '../entities/project/ProjectFactory'

const invalidUserResponse = {
    success:false,
    data: 'Invalid UserData provided to UserFactory'
}

class Interactors {
    userFactory = new UserFactory()
    projectFactory = new ProjectFactory()

    async signUp(userData:any){
        try {
            const user:any = this
            .userFactory
            .createUserFromDataWithId(userData)

            const res = await user.signUp()
            return res
        } 
        catch (error) {
            console.log(error)
            return invalidUserResponse
        }
    }

    async loginWithEmailPassword(loginCred){
        try {
            const user:any = await this
            .userFactory
            .retrieveWithEmailPassword(loginCred)

            return await user.login()
        } 
        catch (error) {
            console.log(error)
            return invalidUserResponse
        }
    }

    async checkUserLogin(userId){
        // Implement using boundary
    }

    async removeUser(deletionData){
        try {
            const {deleterId, deleteeId}
            = deletionData

            const deleleter = await this
            .userFactory
            .retrieveWithUserId(deleterId)

            const deletee = await this
            .userFactory
            .retrieveWithUserId(deleteeId)

            const deleterIsAdmin
            = deleleter.getRole() === 'admin'

            return deleterIsAdmin
            ? await deletee.delete()
            : {
                success: false,
                data: 'Deleter is not admin'
                }
        } 
        catch (error) {
            console.log(error)
            return invalidUserResponse
        }
    }

    async addNewProject(projectData){
        const projectToCreate = this
        .projectFactory
        .createProjectFromDataWithId(projectData)

        return await 
        projectToCreate.create()
    }
}

export default Interactors