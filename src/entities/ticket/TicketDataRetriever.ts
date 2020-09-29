import DataStoreGetter from "../dataStoreAccess/DataStoreGetter";

export default class TicketDataRetriever{
    private dataStore 
    = new DataStoreGetter()
    .getAccordingToEnv()

    async getAllTicketsWhere(ticketData){
        const setRefResponse = await this
        .dataStore.
        setIfNotCreateRef('tickets')

        return setRefResponse.success
        ? await this.dataStore
          .readWhere(ticketData)
        : setRefResponse
    }
}