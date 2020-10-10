
import Interactors from '../Interactors'
import TestDataStoreAccess from '../../entities/dataStoreAccess/TestDataStoreAccess'

const mockSignupData = {
    "accountData":{
        "email": "ham@gmail.com",
        "password":"anypass",
        "name": "ham",
        "role": "admin"
    },
    "userSpecificData":{
        "department": "system admin"
    }
}

describe('Signup', () => {
    let signUpRes

    beforeAll(async ()=>{
        signUpRes = await
        new Interactors()
        .signUp(mockSignupData)
    })


    const ds = new TestDataStoreAccess()
    let accountId;

    it('should store account data in accounts on DB',async ()=>{
        await ds.setIfNotCreateRef('accounts')
        const read = await ds
        .readWhere(mockSignupData.accountData)

        accountId = read.data[0].id

        expect(read.data[0])
        .toMatchObject(mockSignupData.accountData)
    })

    it('should store accountInfo in account specific path in DB', async()=>{
        await ds.setIfNotCreateRef('admins')
        const read = await ds
        .readWhere({userId: accountId})

        expect(read.data[0])
        .toBeDefined()
    })

    it('should return object with success and data properties',()=>{
        expect(signUpRes).toBeDefined()
        expect(signUpRes.success).toBeDefined()
        expect(signUpRes.data).toBeDefined()
    })
})
