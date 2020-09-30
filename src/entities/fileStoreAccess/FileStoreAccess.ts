import QueryResponse from "../QueryResponse";

export default interface FileStoreAccess{
    setIfNotCreateRef(path:string):Promise<QueryResponse>
    write(file):Promise<QueryResponse>
}