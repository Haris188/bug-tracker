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
        console.log(file)
        return {
            success: true,
            data: null
        }
    }

    async generateUrl(){
        return {
            success: true,
            data: 'http://fsdfsd'
        }
    }
}