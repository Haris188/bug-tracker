
import TestFileStore from './TestFileStore'
import LocalFileStoreAccess from './LocalFileStoreAccess'

export default class FileStoreGetter{
    getAccordingToEnv(){
        return new LocalFileStoreAccess()
    }
}