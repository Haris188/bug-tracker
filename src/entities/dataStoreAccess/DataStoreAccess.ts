
import DataStoreResponse from './DataStoreResponse'

interface DataStoreAccess{
    setIfNotCreateRef(path:string): Promise<DataStoreResponse>
    write(fields:any):Promise<DataStoreResponse>
    readWhere(argObj:object): Promise<DataStoreResponse>
}

export default DataStoreAccess