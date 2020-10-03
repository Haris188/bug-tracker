
import FileStoreAccess from './FileStoreAccess'
import {promisify} from 'util'
import * as fs from 'fs'

const fsOpen = promisify(fs.open)
const fsWrite = promisify(fs.write)
const fsMkDir = promisify(fs.mkdir)

export default 
class LocalFileStoreAccess implements FileStoreAccess{
    private ref
    private originalPath
    private openedFile

    async setIfNotCreateRef(path:string){
        this.originalPath = path
        this.ref = `${process.cwd()}/fileStorage/${path}`
        
        const dirExists = this.checkDirExists()
        
        if(dirExists){
            return await this.openDir()
        }
        else{
            const createDirRes
            = await this.createDir()

            return createDirRes.success
            ? this.openDir()
            : createDirRes
        }
    }

    async write(buffer){
        try {
            const writeRes = 
            await fsWrite(this.openedFile, buffer)

            return {
                success:true,
                data: null
            } 
        } 
        catch (error) {
            console.log(error)
            return {
                success:false,
                data: null
            }
        }
    }

    async generateUrl(serverUrl:string){
        return {
            success: true,
            data: `${serverUrl}/file/${this.originalPath}`
        }
    }

    checkDirExists(){
        const path = this.createDirPathFromRef()
        return fs.existsSync(path)
    }

    async createDir(){
        try {
            const dirPath 
            = this.createDirPathFromRef()

            await fsMkDir(dirPath)
            return {
                success:true,
                data:null
            }
        } 
        catch (error) {
            console.log(error)
            return {
                success:false,
                data:null
            }
        }
    }

    async openDir(){
        try {
            const file = 
            await fsOpen(this.ref,'w')
            this.openedFile = file

            return {
                success:true,
                data: null
            }
        } 
        catch (error) {
            console.log(error)
            return {
                success:false,
                data:null
            }
        }
    }

    createDirPathFromRef(){
        const refInParts 
        = this.ref.split('/')

        refInParts.pop()

        let path = ''

        refInParts.forEach((part,i)=>{
            if(i!==0){
                path = path + `/${part}`
            }
        })

        return path
    }
}