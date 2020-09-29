import CommentData from "./CommentData";
import DataStoreGetter from "../dataStoreAccess/DataStoreGetter";

export default class Comment{
    private commentData:CommentData
    private dataStore 
    = new DataStoreGetter()
    .getAccordingToEnv()

    constructor(commentData:CommentData){
        this.commentData = commentData
    }

    async save(){
        return await this
        .saveCommentToDataStore()
    }

    private async saveCommentToDataStore(){
        const setRefResponse= await this
        .dataStore
        .setIfNotCreateRef('comments')

        return setRefResponse.success
        ? await this.dataStore
          .write(this.commentData)
        : setRefResponse
    }
}