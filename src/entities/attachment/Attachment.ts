import FileStoreGetter from "../fileStoreAccess/FileStoreGetter";
import AttachmentData from "./AttachmentData";
import {v4 as uuid} from 'uuid'
import DataStoreGetter from "../dataStoreAccess/DataStoreGetter";

export default class Attachment{
    private attachmentData:AttachmentData

    private dataStore = new DataStoreGetter()
    .getAccordingToEnv()

    private fileStore = new FileStoreGetter()
    .getAccordingToEnv()

    constructor(attachmentData:AttachmentData){
        this.attachmentData = attachmentData
    }

    async add(){
        const saveFileResponse = await this
        .storeAttachmentToFileStore()

        const saveDataResponse 
        = saveFileResponse.success 
        ? await this.getDownloadUrlAfterSave()
        : saveFileResponse

        return saveDataResponse.success
        ? await this.storeAttachmentDataToDataStore()
        : saveDataResponse
    }

    async storeAttachmentToFileStore(){
        const storePath 
        = this.createStorePathString()

        const setRefResponse = await this
        .fileStore
        .setIfNotCreateRef(storePath)

        return setRefResponse.success
        ? await this
          .fileStore
          .write(this.attachmentData
            .file.buffer)
        :setRefResponse
    }

    async storeAttachmentDataToDataStore(){
        const {meta} = this.attachmentData
        const dataToStore = {
            id: meta.id,
            name: meta.name,
            url: meta.url,
            ticketId:meta.ticketId,
            type: meta.type
        }

        const setRefResponse = await this
        .dataStore.setIfNotCreateRef('attachments')

        return setRefResponse.success
        ? await this.dataStore.write(dataToStore)
        : setRefResponse
    }

    async getDownloadUrlAfterSave(){
        const urlResponse = await this
        .fileStore
        .generateUrl(this.attachmentData.meta.serverUrl)

        if(urlResponse.success){
            this.attachmentData.meta.url 
            = urlResponse.data
        }
        
        return urlResponse
    }

    createStorePathString(){
        const ticketId 
        = this.attachmentData
        .meta.ticketId

        const random = uuid()

        const ext = this.attachmentData
        .meta.type.split('/')[1]

        return `${ticketId}/${random}.${ext}`
    }
}