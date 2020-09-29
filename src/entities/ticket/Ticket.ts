import TicketData from "./TicketData";
import DataStoreGetter from "../dataStoreAccess/DataStoreGetter";

export default class Ticket{
    private ticketData
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
}