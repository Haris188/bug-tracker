
import DataStoreAccess from './DataStoreAccess'
import DataStoreResponse from './DataStoreResponse'
import {
    filter,
    remove,
    isMatch,
    trimEnd
} from 'lodash'

class TestDataStoreAccess implements DataStoreAccess{
    private ref:any
    private static dataStore = {
        accounts: [
            {
                id: '1',
                email: 'haris@gmail.com',
                password: 'anypass',
                role: 'developer',
                name: 'haris'
            },
            {
                id: '2',
                email: 'ahmad@gmail.com',
                password: 'anypass',
                role: 'developer',
                name: 'ahmad'
            },
            {
                id: '5',
                email: 'ahmad@gmail.com',
                password: 'anypass',
                role: 'admin',
                name: 'ahmad'
            }
        ],
        developers: [
            {
                id: '1',
                softwareDone:1
            }
        ],
        tickets:[
            {
                problem: 'Submit button not working',
                description: 'description',
                priority: 'high',
                userId: '1',
                projectId: '2',
                id: '1',
                completed:false
            },
            {
                problem: 'Alert dialog not opening',
                description: 'description',
                priority: 'low',
                userId: '2',
                projectId: '2',
                id: '4af5a79b-c3c4-40c9-ae42-16f9bf887435',
                completed:false
              }
        ],
        comments:[
            {
                ticketId: '1',
                comment: 'Getting this error while screen on as well',
                userId: '1',
                id: '698bfd31-f418-4a7f-81a6-e440d3ad8465'
            }
        ],
        'ticket_4af5a79b-c3c4-40c9-ae42-16f9bf887435_attachments': [
            { 
                path: 'http://pathtofile.com/paht' 
            } 
        ],
        projects:[
            {
                id: '1',
                name: 'A test project',
                description: 'A test description'
            }
        ],
        '"id_1_projects"':[
            {
                projectId: '1'
            }
        ]
    }

    async write(data:any){
        TestDataStoreAccess.dataStore[this.ref]
        .push(data)
        console.log(TestDataStoreAccess.dataStore)
        return {success:true,data:null}
    }
 
    async setIfNotCreateRef(path:string){
        const ref = this.findRef(path)
        return ref
        ? this.setRef(path)
        : this.createRef(path)
    }

    async readWhere(argsObj:object){
        const refRecords = TestDataStoreAccess
        .dataStore[this.ref]

        const foundRecord: Array<any> 
        = filter(refRecords, argsObj)

        return {
            success:(foundRecord !== null),
            data: foundRecord
        }
    }

    async deleteWhere(argsObj){
        remove(TestDataStoreAccess
            .dataStore[this.ref],(i:any)=>(
            isMatch(i,argsObj)
        ))

        return {
            success:true,
            data:null
        }
    }

    async updateWhere(updateData, whereFields){
        TestDataStoreAccess.dataStore[this.ref]
        .forEach((ticket,index)=>{
            if(isMatch(ticket, whereFields)){
                TestDataStoreAccess.dataStore[this.ref][index]
                 = {
                     ...TestDataStoreAccess.dataStore[this.ref][index],
                     ...updateData
                 }
            }
        })

        console.log(TestDataStoreAccess.dataStore)
        return {success:true, data:null }
    }

    private findRef(path:string){
        const ref = TestDataStoreAccess.dataStore[path]
        return ref
    }

    private setRef(path){
        this.ref = path
        return {success:true,data:null}
    }

    private createRef(path:string){
        TestDataStoreAccess.dataStore[path] = []
        this.ref = path
        return {success:true,data:null}
    }
}

export default TestDataStoreAccess