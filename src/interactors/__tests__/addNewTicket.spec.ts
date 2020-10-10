import TestDataStoreAccess from '../../entities/dataStoreAccess/TestDataStoreAccess'
import Interactors from '../Interactors'

const mockTicketData = {
    "problem": "Alert Box not working",
    "description": "Gives an error",
    "priority": "high",
    "userId": "1",
    "projectId": "1",
    "completed": false
}

describe('addNewTicket', () => {
    let res
    const db = new TestDataStoreAccess()
    let ticketId

    beforeAll(async()=>{
        res = await new Interactors()
        .addNewTicket(mockTicketData)
    })

    it('should add tickets to projects in DB', async()=>{
        await db.setIfNotCreateRef('tickets')

        const ticketRead = await
        db.readWhere(mockTicketData)

        expect(ticketRead.data[0])
        .toMatchObject(mockTicketData)

        ticketId = ticketRead.data[0].id
    })

    it('should return the ticket in response',()=>{
        expect(res.data)
        .toMatchObject(mockTicketData)
    })
})
