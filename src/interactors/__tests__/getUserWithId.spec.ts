
import Interactors from '../Interactors'

describe('getUserWithEmailPassword', () => {
    describe('if user found,', () => {
        it('should return a user with the provided email and password', async()=>{
            const userRes = await
            new Interactors()
            .getUserWithId('1')
            
            const user = userRes.data.accountData
            
            expect(user.email).toBeDefined()
            expect(user.password).toBeDefined()
            expect(user.id).toBeDefined()
            expect(user.role).toBeDefined()
            expect(user.name).toBeDefined()
        })
    })

    describe('if user not found,', () => {
        it('should return an object with key success:false',async()=>{
            const userRes = await
            new Interactors()
            .getUserWithId('NonExistentId')

            expect(userRes).toBeDefined()
            expect(userRes.success).toBe(false)
        })
    })
    
    
})
