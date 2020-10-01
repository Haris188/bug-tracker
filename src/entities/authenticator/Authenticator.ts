import DataStoreAccess from "../dataStoreAccess/DataStoreAccess"
import DataStoreGetter from "../dataStoreAccess/DataStoreGetter"
import TestAuthentication from '../authenticationLib/TestAuthentication'


class Authenticator{
    private signUpData:any
    private dataStore:DataStoreAccess
    private authenticationLib 
    = new TestAuthentication()

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
        await this
        .dataStore
        .setIfNotCreateRef('accounts')

        return await this.dataStore
        .write(
            this.signUpData
            .accountData
        )
    }

    private async storeAdminData(){
        await this
        .dataStore
        .setIfNotCreateRef('admins')

        return await this.dataStore
        .write(
            this.signUpData
            .userSpecificData
        )
    }

    private async storeDeveloperData(){
        await this
        .dataStore
        .setIfNotCreateRef('developers')

        return await this.dataStore
        .write(
            this.signUpData
            .userSpecificData
        )
    }

    private async storeTesterData(){
        await this
        .dataStore
        .setIfNotCreateRef('tester')

        return await this.dataStore
        .write(
            this.signUpData
            .userSpecificData
        )
    }

    private async storeProjectManagerData(){
        await this
        .dataStore
        .setIfNotCreateRef('projectManager')

        return await this.dataStore
        .write(
            this.signUpData
            .userSpecificData
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