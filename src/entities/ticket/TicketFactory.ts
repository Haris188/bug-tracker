
import TicketData from './TicketData'
import Ticket from './Ticket'
import {v4 as uuid} from 'uuid'
import DataStoreGetter from '../dataStoreAccess/DataStoreGetter'

export default class TicketFactory{
    private dataStore 
    = new DataStoreGetter()
    .getAccordingToEnv()

    createTicketFromData(ticketData:TicketData){
        return new Ticket(ticketData)
    }

    createTicketFromDataWithId(ticketData){
        ticketData.id = uuid()
        return this.createTicketFromData(ticketData)
    }

    async retrieveTicketWithId(ticketId){
        const ticketData= await this
        .getTicketDataFromDataStoreWithId(ticketId)

        return ticketData.success
        ? this.createTicketFromData(ticketData.data)
        : ticketData
    }

    async getTicketDataFromDataStoreWithId(ticketId){
        const setRefResponse = await this
        .dataStore
        .setIfNotCreateRef('tickets')

        const readResponse = setRefResponse.success
        ? await this
          .dataStore
          .readWhere({id: ticketId})
        : setRefResponse

        return this
        .formatReadResponse(readResponse)
    }

    formatReadResponse(readResponse){
        if(readResponse.success){
            if(readResponse.data.length > 0){
                readResponse.data 
                = readResponse.data[0]
            }
            else{
                readResponse.data = null
            }
        }

        return readResponse
    }
}