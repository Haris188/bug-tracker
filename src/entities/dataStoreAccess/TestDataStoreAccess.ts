
import DataStoreAccess from './DataStoreAccess'
import DataStoreResponse from './DataStoreResponse'
import {
    filter,
    remove,
    isMatch
} from 'lodash'

class TestDataStoreAccess implements DataStoreAccess{
    ref:any
    dataStore = {
        accounts: [
            {
                id: 1,
                email: 'haris@gmail.com',
                password: 'anypass',
                role: 'developer'
            },
            {
                id: 2,
                email: 'ahmad@gmail.com',
                password: 'anypass',
                role: 'developer'
            },
            {
                id: 5,
                email: 'ahmad@gmail.com',
                password: 'anypass',
                role: 'admin'
            }
        ],
        developers: [
            {
                id: 1,
                softwareDone:1
            }
        ]

    }

    async write(data:any){
        this.dataStore[this.ref]
        .push(data)
        return {success:true,data:null}
    }
 
    async setIfNotCreateRef(path:string){
        const ref = this.findRef(path)
        return ref
        ? this.setRef(path)
        : this.createRef(path)
    }

    async readWhere(argsObj:object){
        const refRecords = this
        .dataStore[this.ref]

        const foundRecord: Array<any> 
        = filter(refRecords, argsObj)

        return {
            success:(foundRecord !== null),
            data: foundRecord
        }
    }

    async deleteWhere(argsObj){
        return {
            success:true,
            data:null
        }
    }

    private findRef(path:string){
        const ref = this.dataStore[path]
        return ref
    }

    private setRef(path){
        this.ref = path
        return {success:true,data:null}
    }

    private createRef(path:string){
        this.dataStore[path] = []
        this.ref = path
        return {success:true,data:null}
    }
}

export default TestDataStoreAccess