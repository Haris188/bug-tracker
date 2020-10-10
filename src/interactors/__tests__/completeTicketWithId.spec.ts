import TestDataStoreAccess from '../../entities/dataStoreAccess/TestDataStoreAccess'
import Interactors from '../Interactors'

const mockTicketId = '1'

describe('completeTicketWithId', () => {
    let res
    const db = new TestDataStoreAccess()

    beforeAll(async()=>{
        res = await new Interactors()
        .completeTicketWithId(mockTicketId)
    })

    it('should update completed to true for provided ticket id', async()=>{
        await db.setIfNotCreateRef('tickets')

        const ticketRead = await
        db.readWhere({id: mockTicketId})

        expect(ticketRead.data[0].completed)
        .toBe(true)
    })
})
