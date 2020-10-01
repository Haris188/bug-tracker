
import UserFactory from '../entities/user/UserFactory'
import ProjectFactory from '../entities/project/ProjectFactory'
import TicketFactory from '../entities/ticket/TicketFactory'
import CommentFactory from '../entities/comment/CommentFactory'
import TicketDataRetriever from '../entities/ticket/TicketDataRetriever'

const invalidUserResponse = {
    success:false,
    data: 'Invalid UserData provided to UserFactory'
}

class Interactors {
    private userFactory = new UserFactory()
    private projectFactory = new ProjectFactory()
    private ticketFactory = new TicketFactory()
    private commentFactory = new CommentFactory()
    private ticketDataRetriever = new TicketDataRetriever()

    async signUp(userData:any){
        try {
            const user:any = await this
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

    async addNewTicket(ticketData){
        const ticketToCreate = this
        .ticketFactory
        .createTicketFromDataWithId(ticketData)

        return await
        ticketToCreate.create()
    }

    async setTicketUser(updateData){
        const ticketToUpdate = await this
        .ticketFactory
        .retrieveTicketWithId(updateData.ticketId)

        return ticketToUpdate
        ? await ticketToUpdate
        .setUser(updateData.userId)
        :{success:false, data:'No Ticket found with id'}
    }

    async addCommentToTicket(commentData){
        const comment = this
        .commentFactory
        .createCommentFromDataWithId(commentData)

        return await 
        comment.save()
    }

    async getCurrentUserTicketsForProject(ticketData){
        return await this
        .ticketDataRetriever
        .getAllTicketsWhere(ticketData)
    }

    async getAllTicketsForProject(projectId){
        return await this
        .ticketDataRetriever
        .getAllTicketsWhere({
            projectId
        })
    }

    async completeTicketWithId(ticketId){
        const ticketToUpdate = await this
        .ticketFactory
        .retrieveTicketWithId(ticketId)

        return await 
        ticketToUpdate.complete()
    }

    async addAttachmentToTicketWithId(attachmentData){
        const ticketToUpdate = await this
        .ticketFactory
        .retrieveTicketWithId(attachmentData.ticketId)

        return await
        ticketToUpdate
        .addAttachment(attachmentData.file)
    }

    async getAttachementsOfTicket(ticketId){
        const ticketToWorkWith = await this
        .ticketFactory
        .retrieveTicketWithId(ticketId)

        return await 
        ticketToWorkWith
        .getAllAttachments()
    }
}

export default Interactors