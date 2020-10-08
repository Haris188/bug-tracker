
import Interactors from './interactors/Interactors'
import DataStore from './entities/dataStoreAccess/TestDataStoreAccess'
import UserFactory from './entities/user/UserFactory'

// new Interactors().signUp({
//     accountData:{
//         name: 'chan',
//         email: 'chan@gamil.com',
//         password: 'anypass',
//         role:'developer'
//     },
//     userSpecificData:{
//         department: 'Payroll'
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
//     deleterId:'d8cccd7b-da9d-4476-aee5-7117347a8c13',
//     deleteeId: 'e319cba1-2fea-4a22-9b1b-d841e72f695e'
// })
// .then(value=>console.log(value))

// new Interactors()
// .addNewProject({
//     project:{
//         name: 'project',
//         description: 'a project description',
//     },
//     users:[
//         'd8cccd7b-da9d-4476-aee5-7117347a8c13',
//         '411ba330-4352-4817-9a1f-6d4600110a5a'
//     ]
// })
// .then(value=>console.log(value))

// new Interactors()
// .addNewTicket({
//     problem: 'Submit button not working',
//     description: 'description',
//     priority: 'high',
//     userId: 'd8cccd7b-da9d-4476-aee5-7117347a8c13',
//     projectId: '1913062e-7e1f-4b1f-9e23-164ebd87f600',
//     completed: false
// })
// .then(value=>console.log(value))

// new Interactors()
// .setTicketUser({
//     ticketId: '22a265da-840c-4da5-974c-252f2f9b40ee',
//     userId: '234'
// })
// .then(value=>console.log(value))

// new Interactors()
// .addCommentToTicket({
//     ticketId: '22a265da-840c-4da5-974c-252f2f9b40ee',
//     text: 'Hello world',
//     userId: '1'
// })
// .then(value=>console.log(value))

// new Interactors()
// .getCurrentUserTicketsForProject({
//     projectId: '1913062e-7e1f-4b1f-9e23-164ebd87f600',
//     userId: '234'
// })
// .then(value=>console.log(value))

// new Interactors()
// .getAllTicketsForProject('1913062e-7e1f-4b1f-9e23-164ebd87f600')
// .then(value=>console.log(value))

// new Interactors()
// .completeTicketWithId('22a265da-840c-4da5-974c-252f2f9b40ee')
// .then(value=>console.log(value))

// new Interactors()
// .addAttachmentToTicketWithId({
//     ticketId:'4af5a79b-c3c4-40c9-ae42-16f9bf887435',
//     file: ''
// })
// .then(value=>console.log(value))

// new Interactors()
// .getAttachementsOfTicket('4af5a79b-c3c4-40c9-ae42-16f9bf887435')
// .then(value=>console.log(value))

// import PgDataStoreAccess from './entities/dataStoreAccess/PgDataStoreAccess'

// const store = new PgDataStoreAccess()

// store.setIfNotCreateRef('accounts')
// .then(value=>{
//     console.log(value)
//     store.deleteWhere({id:1})
//     .then(value=>console.log(value))
// })



// import submitQuery from './entities/dataStoreAccess/PgDataStoreAccess/submitQuery'

// submitQuery('SELECT * FROM test2;')
// .then(value=>console.log(value))

// import QueryCreator from './entities/dataStoreAccess/PgDataStoreAccess/QueryCreator'

// console.log(new QueryCreator()
// .getDeleteWhereQuery('accounts',{
//     id: '2',
//     email: 'hasr'
// }))


export default ()=>{
    // new Interactors()
    // .addAttachmentToTicketWithId({
    //     meta:{
    //         name: 'file.jpg',
    //         type: 'image/jpg',
    //         ticketId: 'randomg id',
            
    //     },
    //     file:{
    //         buffer:'buffer',
    //         hello: 'hellofile'
    //     }
    // })
    // .then(value=>console.log(value))

    new Interactors()
    .getCommentsForTicket("52b3c5c6-4ca0-4f28-a99d-2e4ca6b096be")
    .then(value=>console.log(value))


}