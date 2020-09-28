import DataStoreAccess from "../dataStoreAccess/DataStoreAccess"
import DataStoreGetter from "../dataStoreAccess/DataStoreGetter"
import TestAuthentication from '../authenticationLib/TestAuthentication'


class Authenticator{
    signUpData:any
    dataStore:DataStoreAccess
    authenticationLib = new TestAuthentication()

    async signUpAdmin(userData:any){
        this.signUpData = userData

        this.initializeDataStore()

        const accountRes 
        = await this.storeAccountData()

        const adminRes
        = await this.storeAdminData()

        const successData
        = [accountRes, adminRes]

        const successReport
        = this.createSuccessReportFrom(successData)

        return successReport
    }

    async signUpDeveloper(userData:any){
        this.signUpData = userData

        this.initializeDataStore()

        const accountRes 
        = await this.storeAccountData()

        const developerRes
        = await this.storeDeveloperData()

        const successData
        = [accountRes, developerRes]

        const successReport
        = this.createSuccessReportFrom(successData)

        return successReport
    }

    async signUpTester(userData:any){
        this.signUpData = userData

        console.log('tester')

        this.initializeDataStore()

        const accountRes 
        = await this.storeAccountData()

        const testerRes
        = await this.storeTesterData()

        const successData
        = [accountRes, testerRes]

        const successReport
        = this.createSuccessReportFrom(successData)

        return successReport
    }

    async signUpProjectManager(userData:any){
        this.signUpData = userData

        this.initializeDataStore()

        const accountRes 
        = await this.storeAccountData()

        const projectManagerRes
        = await this.storeProjectManagerData()

        const successData
        = [accountRes, projectManagerRes]

        const successReport
        = this.createSuccessReportFrom(successData)

        return successReport
    }

    async signInAsAdmin(userData){
        return await 
        this.signIn(userData)
    }

    async signInAsDeveloper(userData){
        return await 
        this.signIn(userData)
    }

    async signInAsTester(userData){
        return await 
        this.signIn(userData)
    }

    async signInAsProjectManager(userData){
        return await 
        this.signIn(userData)
    }

    async checkIsLoggedInOfUserWithId(userId){
        return await this
        .authenticationLib
        .checkIsLoggedInWithUserId(userId)
    }

    private async signIn(userData){
        return await this
        .authenticationLib
        .signInWithEmailPassword(
            userData.accountData.email,
            userData.accountData.password
        )
    }

    private initializeDataStore(){
        const dataStore
        = new DataStoreGetter()
        .getAccordingToEnv()

        this.dataStore = dataStore
    }

    private async storeAccountData(){
        this.dataStore.setIfNotCreateRef('accounts')

        return this.dataStore
        .write(
            this.signUpData
            .accountData
        )
    }

    private async storeAdminData(){
        this.dataStore.setIfNotCreateRef('admins')

        return this.dataStore
        .write(
            this.signUpData
            .typeSpecificData
        )
    }

    private async storeDeveloperData(){
        this.dataStore.setIfNotCreateRef('developers')

        return this.dataStore
        .write(
            this.signUpData
            .typeSpecificData
        )
    }

    private async storeTesterData(){
        this.dataStore.setIfNotCreateRef('tester')

        return this.dataStore
        .write(
            this.signUpData
            .typeSpecificData
        )
    }

    private async storeProjectManagerData(){
        this.dataStore.setIfNotCreateRef('projectManager')

        return this.dataStore
        .write(
            this.signUpData
            .typeSpecificData
        )
    }

    private createSuccessReportFrom(successData){
        let success = true

        for(var index = 1; index<successData.length; index++){
            const currentDataSuccess 
            = successData[index].success

            success = success && currentDataSuccess
            if(!currentDataSuccess){
                break;
            }
        }

        return {
            success,
            data:null
        }
    }
}

export default Authenticator