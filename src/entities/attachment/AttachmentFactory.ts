import AttachmentData from "./AttachmentData";
import Attachment from './Attachment'
import {v4 as uuid} from 'uuid'

export default class AttachmentFactory{

    createAttachmentFromData(attachmentData:AttachmentData){
        return new Attachment(attachmentData)
    }

    createAttachementFromDataWithId(attachmentData:AttachmentData){
        attachmentData.meta.id = uuid()
        return this
        .createAttachmentFromData(attachmentData)
    }
}