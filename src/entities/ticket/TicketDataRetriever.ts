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

    async getAllTicketStats(){
      try {
        const fixed = await this
        .getAllTicketsWhere({completed:"true"})
        const notFixed = await this
        .getAllTicketsWhere({completed: "false"})
        const lowPr = await this
        .getAllTicketsWhere({priority: 'low'})
        const mediumPr = await this
        .getAllTicketsWhere({priority: 'medium'})
        const highPr = await this
        .getAllTicketsWhere({priority: 'high'})

        return {
          success: true,
          data: {
            fixed: fixed.data.length,
            notFixed: notFixed.data.length,
            lowPr: lowPr.data.length,
            mediumPr: mediumPr.data.length,
            highPr: highPr.data.length,
          }
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
}