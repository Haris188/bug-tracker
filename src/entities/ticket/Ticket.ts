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
        const ticketRes = await 
        this.saveTicketToDataStore()

        return ticketRes.success
        ? await this.getTicketWithId()
        : ticketRes
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
            {completed:true},
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
            `attachments`
        )

        return setRefResponse.success
        ? await this.dataStore.readWhere({ticketId: this.ticketData.id})
        : setRefResponse
    }

    async getAllComments(){
        const dataStore = new DataStoreGetter()
        .getAccordingToEnv()

        const setRef = await dataStore
        .setIfNotCreateRef('comments')

        return setRef.success
        ? await dataStore
        .readWhere({ticketid: this.ticketData.id})
        : setRef
    }

    private async getTicketWithId(){
        const dataStore = new DataStoreGetter()
        .getAccordingToEnv()

        const refSet = await
        dataStore
        .setIfNotCreateRef('tickets')

        const ticket = refSet.success
        ? await dataStore
          .readWhere({id: this.ticketData.id})
        : refSet

        if(ticket.success && ticket.data.length > 0){
            ticket.data = ticket.data[0]
        }
        else{
            ticket.data=null
        }

        return ticket

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