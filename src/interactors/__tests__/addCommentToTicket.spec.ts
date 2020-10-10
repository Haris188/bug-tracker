import TestDataStoreAccess from '../../entities/dataStoreAccess/TestDataStoreAccess'
import Interactors from '../Interactors'

const mockCommentData = {
    "ticketId": "1",
    "text": "Did you try linked list?",
    "userId": "1"
}

describe('addCommentToTicket', () => {
    let res
    const db = new TestDataStoreAccess()

    beforeAll(async()=>{
        res = await new Interactors()
        .addCommentToTicket(mockCommentData)
    })

    it('should add comment to DB', async()=>{
        await db.setIfNotCreateRef('comments')

        const commentRead = await
        db.readWhere(mockCommentData)

        expect(commentRead.data[0])
        .toMatchObject(mockCommentData)
    })
})
