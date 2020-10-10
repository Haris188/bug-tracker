"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Attachment_1 = require("./Attachment");
const uuid_1 = require("uuid");
class AttachmentFactory {
    createAttachmentFromData(attachmentData) {
        return new Attachment_1.default(attachmentData);
    }
    createAttachementFromDataWithId(attachmentData) {
        attachmentData.meta.id = uuid_1.v4();
        return this
            .createAttachmentFromData(attachmentData);
    }
}
exports.default = AttachmentFactory;
