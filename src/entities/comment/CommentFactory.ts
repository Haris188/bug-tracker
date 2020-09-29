
import {v4 as uuid} from 'uuid'
import Comment from './Comment'
import CommentData from './CommentData'

export default class CommentFactory{

    createCommentFromData(commentData:CommentData){
        return new Comment(commentData)
    }

    createCommentFromDataWithId(commentData){
        commentData.id = uuid()
        
        return this.
        createCommentFromData(commentData)
    }
}