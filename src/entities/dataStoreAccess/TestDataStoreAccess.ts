
import DataStoreAccess from './DataStoreAccess'
import DataStoreResponse from './DataStoreResponse'

class TestDataStoreAccess implements DataStoreAccess{
    ref:any
    dataStore = {}

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

    readWhere(argsObj:object){
        return new Promise<DataStoreResponse>(resolve=>{
            resolve({
                data: {
                    id:'234'
                }
            })
        })
    }

    private findRef(path:string){
        const ref = this.dataStore[path]
        return ref
    }

    private setRef(path){
        this.ref(path)
        return {success:true,data:null}
    }

    private createRef(path:string){
        this.dataStore[path] = []
        this.ref = path
        return {success:true,data:null}
    }
}

export default TestDataStoreAccess