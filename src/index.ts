
import Interactors from './interactors/Interactors'
import DataStore from './entities/dataStoreAccess/TestDataStoreAccess'
import UserFactory from './entities/UserFactory'

// new Interactors().signUp({
//     accountData:{
//         role:'projectManager'
//     },
//     userSpecificData:{
//         adminType:'system admin'
//     }
// })
// .then((value)=>{
//     console.log(value)
// })

const dataStore = new DataStore()
// dataStore.setIfNotCreateRef('test')
// dataStore.write({test1:'test'})
// dataStore.setIfNotCreateRef('hele')
// dataStore.write({test2:'test'})
// console.log(dataStore.dataStore)

// new Interactors().loginWithEmailPassword({
//     email: 'haris@gmail.com',
//     password: 'anypass'
// })
// .then(value=>{
//     console.log(value)
// })

// dataStore.setIfNotCreateRef('accounts')
// .then(value=>{
//     dataStore.readWhere({
        
//     })
//     .then(value=>{
//         console.log(value)
//     })
// })

// new UserFactory()
// .retrieveWithUserId(5)
// .then(value=>console.log(value.getRole()))

// new Interactors().checkUserLogin(2)
// .then(value=>{
//     console.log(value)
// })

new Interactors()
.removeUser({
    deleterId:6,
    deleteeId: 1
})
.then(value=>console.log(value))