import TicketData from "./TicketData";
import DataStoreGetter from "../dataStoreAccess/DataStoreGetter";
import FileStoreGetter from '../fileStoreAccess/FileStoreGetter'

export default class Ticket{
    private ticketData

    private fileStore 
    = new FileStoreGetter()
    .getAccordingToEnv() 

    private dataStore
    = new DataStoreGetter()
    .getAccordingToEnv()

    constructor(ticketData:TicketData){
        this.ticketData = ticketData
    }

    async create(){
        return await 
        this.saveTicketToDataStore()
    }

    async saveTicketToDataStore(){
        const setRefResponse 
        = await this.dataStore
        .setIfNotCreateRef('tickets')

        return setRefResponse.success
        ? await this.dataStore.write(this.ticketData)
        : setRefResponse
    }

    async setUser(userId){
        const setRefResponse 
        = await this.dataStore
        .setIfNotCreateRef('tickets')
        
        return setRefResponse.success
        ? await this.dataStore.updateWhere(
            {userId},
            {id: this.ticketData.id}
          )
        : setRefResponse
    }

    async complete(){
        const setRefResponse 
        = await this.dataStore
        .setIfNotCreateRef('tickets')

        return setRefResponse.success
        ? await this.dataStore.updateWhere(
            {complete:true},
            {id: this.ticketData.id}
          )
        :setRefResponse
    }

    async addAttachment(file){
        const storeResponse = await this
        .storeAttachmentToFileStore(file)

        return storeResponse.success
        ? await this
          .storeAttachmentPathToDataStore(
              storeResponse.data
            )
        : storeResponse
    }

    async getAllAttachments(){
        const setRefResponse = await this
        .dataStore
        .setIfNotCreateRef(
            `ticket_${this.ticketData.id}_attachments`
        )

        return setRefResponse.success
        ? await this.dataStore.readWhere({})
        : setRefResponse
    }

    private async storeAttachmentToFileStore(file){
        const setRefResponse = await this
        .fileStore
        .setIfNotCreateRef(
            `attachments/${this.ticketData.id}`
        )

        return setRefResponse.success
        ? await this.fileStore.write(file)
        : setRefResponse
    }

    private async storeAttachmentPathToDataStore(path){
        const setRefResponse = await this
        .dataStore
        .setIfNotCreateRef(
            `ticket_${this.ticketData.id}_attachments`
        )

        return setRefResponse.success
        ? await this.dataStore.write({
            path
          })
        : setRefResponse
    }
}