
import Interactors from './interactors/Interactors'
import DataStore from './entities/dataStoreAccess/TestDataStoreAccess'

new Interactors().signUp({
    accountData:{
        role:'projectManager'
    },
    userSpecificData:{
        adminType:'system admin'
    }
})
.then((value)=>{
    console.log(value)
})

// const dataStore = new DataStore()
// dataStore.setIfNotCreateRef('test')
// dataStore.write({test1:'test'})
// dataStore.setIfNotCreateRef('hele')
// dataStore.write({test2:'test'})
// console.log(dataStore.dataStore)