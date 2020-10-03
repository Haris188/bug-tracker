
import * as passport from 'passport'
import Interactors from '../interactors/Interactors'
import * as express from 'express'

const failedResponse = {
    success: false,
    data: 'Request body is empty or null'
}

export default (app)=>{
    const interactors = new Interactors()
    app.post('/getTicketAttachments',async (req,res)=>{
        const body = req.body

        if(body){
            const {ticketId} = body
            const getResponse = await 
            interactors
            .getAttachementsOfTicket(ticketId)

            res.send(getResponse)
        }
        else{
            res.send(failedResponse)
        }
    })

    app.post('/login', (req:any,res:any, next:any)=>{
        passport.authenticate('local',(err,user)=>{
            req.login(user, (err:any)=>{
                console.log('LOGIN')

                res.send({
                    success: true,
                    data: user
                })
                
                if(err){
                    res.send({
                        success:false,
                        data: 'login failed'
                    })
                }
            })
        })(req, res, next)
    })

    app.post('/signup',async (req,res)=>{
        const user = req.body

        if(user){
            const signUpResponse = await 
            interactors.signUp(user)
            res.send(signUpResponse)
        }
        else{
            res.send({
                success: false,
                data: 'User info provided is null'
            })
        }
    })

    app.use((req,res,next)=>{
        const userAuthenticated
        = req.isAuthenticated()

        if(userAuthenticated){
            next()
        }
        else{
            res.send(failedResponse)
        }
    })

    app.post('/removeUser',async(req,res)=>{
        const deleteeId
        = req.body.deleteeId
        
        if(deleteeId){
            const removalInfo = {
                deleterId: req.user.id,
                deleteeId
            }
            const removeResponse = await
            interactors.removeUser(removalInfo)
            res.send(removeResponse)
        }
        else{
            res.send(failedResponse)
        }
    })

    app.post('/addProject', async(req,res)=>{
        const body = req.body

        if(body){
            const projectData = body
            const addResponse = await 
            interactors
            .addNewProject(projectData)

            res.send(addResponse)
        }
        else{
            res.send(failedResponse)
        }
    })

    app.post('/addTicket', async(req,res)=>{
        const body = req.body

        if(body){
            const ticketData = body
            const addResponse = await 
            interactors
            .addNewTicket(ticketData)

            res.send(addResponse)
        }
        else{
            res.send(failedResponse)
        }
    })

    app.post('/setTicketUser', async(req,res)=>{
        const body = req.body

        if(body){
            const ticketData = body
            const addResponse = await 
            interactors
            .setTicketUser(ticketData)

            res.send(addResponse)
        }
        else{
            res.send(failedResponse)
        }
    })

    app.post('/addCommentToTicket', async(req,res)=>{
        const body = req.body

        if(body){
            const commentData = body
            const commentResponse = await 
            interactors
            .addCommentToTicket(commentData)

            res.send(commentResponse)
        }
        else{
            res.send(failedResponse)
        }
    })

    app.post('/getCurrentUserTickets', async(req,res)=>{
        const body = req.body

        if(body){
            const ticketData = body
            const ticketResponse = await 
            interactors
            .getCurrentUserTicketsForProject(ticketData)

            res.send(ticketResponse)
        }
        else{
            res.send(failedResponse)
        }
    })

    app.post('/getAllTicketsForProject', async(req,res)=>{
        const body = req.body

        if(body){
            const {projectId} = body
            const ticketResponse = await 
            interactors
            .getAllTicketsForProject(projectId)

            res.send(ticketResponse)
        }
        else{
            res.send(failedResponse)
        }
    })

    app.post('/completeTicket', async(req,res)=>{
        const body = req.body

        if(body){
            const {ticketId} = body
            const completeResponse = await 
            interactors
            .completeTicketWithId(ticketId)

            res.send(completeResponse)
        }
        else{
            res.send(failedResponse)
        }
    })

    

    app.use(
        '/file',
        express.static(process.cwd() + '/fileStorage')
    )
}