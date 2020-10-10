import TestDataStoreAccess from '../../entities/dataStoreAccess/TestDataStoreAccess'
import Interactors from '../Interactors'

const mockTicketData = {
    ticketId: '1',
    userId: '5'
}

describe('setTicketUser', () => {
    let res
    const db = new TestDataStoreAccess()
    let ticketId

    beforeAll(async()=>{
        res = await new Interactors()
        .setTicketUser(mockTicketData)
    })

    it('should update user of ticket in DB', async()=>{
        await db.setIfNotCreateRef('tickets')

        const ticketRead = await
        db.readWhere({id:mockTicketData.ticketId})

        expect(ticketRead.data[0].userId)
        .toBe(mockTicketData.userId)

        ticketId = ticketRead.data[0].id
    })
})
