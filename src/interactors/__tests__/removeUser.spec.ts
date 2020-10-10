
import Interactors from '../Interactors'
import TestDataStoreAccess from '../../entities/dataStoreAccess/TestDataStoreAccess'

describe('removeUser', () => {
    const ds = new TestDataStoreAccess()
    const interactors = new Interactors()

    describe('On user exist', () => {
        it('should not remove user from account in DB if Deleter is not Admin',async()=>{
            await interactors
            .removeUser({
                deleterId: '1',
                deleteeId: '2'
            })

            await ds.setIfNotCreateRef('accounts')
            const readRes = await
            ds.readWhere({id: '2'})
            const user = readRes.data
            expect(user.length).toBeGreaterThan(0)
        })

        it('should remove user from account in DB if Deleter is Admin',async()=>{
            await interactors
            .removeUser({
                deleterId: '5',
                deleteeId: '2'
            })

            await ds.setIfNotCreateRef('accounts')
            const readRes = await
            ds.readWhere({id: '2'})
            const user = readRes.data
            expect(user).toHaveLength(0)
        })

        it('should return false if deleter is not admin',async ()=>{
            const remRes = await 
            interactors
            .removeUser({
                deleterId: '1',
                deleteeId: '2'
            })
            expect(remRes.success).toBe(false)
        })
    })
    
    describe('On user not-existent', () => {
        it('should return false in success',async ()=>{
            const remRes = await
            interactors
            .removeUser({
                deleterId: '5',
                deleteeId: 'Non-Existent'
            })
            expect(remRes.success).toBe(false)
        })
    })
    
})
