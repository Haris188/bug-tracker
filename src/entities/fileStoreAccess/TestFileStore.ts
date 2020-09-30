import FileStoreAccess from "./FileStoreAccess";

export default 
class TestFileStore 
implements FileStoreAccess{
    async setIfNotCreateRef(path:string){
        return {
            success:true,
            data:null
        }
    }

    async write(file){
        return {
            success: true,
            data: 'http://pathtofile.com/paht'
        }
    }
}