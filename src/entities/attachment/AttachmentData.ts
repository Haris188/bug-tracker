
export default interface AttachmentData{
    meta: {
        id?:string
        name: string
        url?:string
        type:string
        ticketId:string
        serverUrl: string
    }
    file?: {
        buffer?: any
        [otherOptions:string]:any
    }
}