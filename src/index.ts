
import Interactors from './interactors/Interactors'
import DataStore from './entities/dataStoreAccess/TestDataStoreAccess'
import UserFactory from './entities/user/UserFactory'

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

// const dataStore = new DataStore()
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

// new Interactors()
// .removeUser({
//     deleterId:5,
//     deleteeId: 1
// })
// .then(value=>console.log(value))

// new Interactors()
// .addNewProject({
//     project:{
//         name: 'project',
//         description: 'a project description',
//     },
//     users:[
//         1,2,4
//     ]
// })
// .then(value=>console.log(value))

// new Interactors()
// .addNewTicket({
//     problem: 'Submit button not working',
//     description: 'description',
//     priority: 'high',
//     userId: 1,
//     projectId: 2
// })
// .then(value=>console.log(value))

// new Interactors()
// .setTicketUser({
//     ticketId: '1',
//     userId: '10'
// })
// .then(value=>console.log(value))

// new Interactors()
// .addCommentToTicket({
//     ticketId: '1',
//     text: 'Hello world',
//     userId: '1'
// })
// .then(value=>console.log(value))

// new Interactors()
// .getCurrentUserTicketsForProject({
//     projectId: '2',
//     userId: '1'
// })
// .then(value=>console.log(value))

// new Interactors()
// .getAllTicketsForProject('2')
// .then(value=>console.log(value))

// new Interactors()
// .completeTicketWithId('5af5a79b-c3c4-40c9-ae42-16f9bf887435')
// .then(value=>console.log(value))

// new Interactors()
// .addAttachmentToTicketWithId({
//     ticketId:'4af5a79b-c3c4-40c9-ae42-16f9bf887435',
//     file: ''
// })
// .then(value=>console.log(value))

new Interactors()
.getAttachementsOfTicket('4af5a79b-c3c4-40c9-ae42-16f9bf887435')
.then(value=>console.log(value))