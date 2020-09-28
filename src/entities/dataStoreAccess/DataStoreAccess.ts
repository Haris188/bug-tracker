
import DataStoreResponse from './DataStoreResponse'
import QueryResponse from '../QueryResponse'

interface DataStoreAccess{
    setIfNotCreateRef(path:string): Promise<DataStoreResponse>
    write(fields:any):Promise<DataStoreResponse>
    readWhere(argObj:object): Promise<DataStoreResponse>
    deleteWhere(argsObj): Promise<QueryResponse>
}

export default DataStoreAccess