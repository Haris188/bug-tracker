import TestDataStoreAccess from '../../entities/dataStoreAccess/TestDataStoreAccess'
import Interactors from '../Interactors'

const mockCommentData = '1'

describe('getCommentsForTicket', () => {
    let res
    const db = new TestDataStoreAccess()

    beforeAll(async()=>{
        res = await new Interactors()
        .getCommentsForTicket(mockCommentData)
    })

    it('should get list with comment type data', async()=>{
        await db.setIfNotCreateRef('comments')

        const commentRead = await
        db.readWhere({ticketId:mockCommentData})

        expect(commentRead.data)
        .toBeInstanceOf(Array)
        expect(Object.keys(commentRead.data[0]).toString())
        .toContain([
            'ticketId',
            'comment',
            'userId',
            'id'
        ].toString())
    })
})
