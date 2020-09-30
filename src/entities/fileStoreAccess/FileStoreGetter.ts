
import TestFileStore from './TestFileStore'

export default class FileStoreGetter{
    getAccordingToEnv(){
        return new TestFileStore()
    }
}