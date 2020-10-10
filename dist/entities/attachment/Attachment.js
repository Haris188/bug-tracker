"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileStoreGetter_1 = require("../fileStoreAccess/FileStoreGetter");
const uuid_1 = require("uuid");
const DataStoreGetter_1 = require("../dataStoreAccess/DataStoreGetter");
class Attachment {
    constructor(attachmentData) {
        this.dataStore = new DataStoreGetter_1.default()
            .getAccordingToEnv();
        this.fileStore = new FileStoreGetter_1.default()
            .getAccordingToEnv();
        this.attachmentData = attachmentData;
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            const saveFileResponse = yield this
                .storeAttachmentToFileStore();
            const saveDataResponse = saveFileResponse.success
                ? yield this.getDownloadUrlAfterSave()
                : saveFileResponse;
            return saveDataResponse.success
                ? yield this.storeAttachmentDataToDataStore()
                : saveDataResponse;
        });
    }
    storeAttachmentToFileStore() {
        return __awaiter(this, void 0, void 0, function* () {
            const storePath = this.createStorePathString();
            const setRefResponse = yield this
                .fileStore
                .setIfNotCreateRef(storePath);
            return setRefResponse.success
                ? yield this
                    .fileStore
                    .write(this.attachmentData
                    .file.buffer)
                : setRefResponse;
        });
    }
    storeAttachmentDataToDataStore() {
        return __awaiter(this, void 0, void 0, function* () {
            const { meta } = this.attachmentData;
            const dataToStore = {
                id: meta.id,
                name: meta.name,
                url: meta.url,
                ticketId: meta.ticketId,
                type: meta.type
            };
            const setRefResponse = yield this
                .dataStore.setIfNotCreateRef('attachments');
            return setRefResponse.success
                ? yield this.dataStore.write(dataToStore)
                : setRefResponse;
        });
    }
    getDownloadUrlAfterSave() {
        return __awaiter(this, void 0, void 0, function* () {
            const urlResponse = yield this
                .fileStore
                .generateUrl(this.attachmentData.meta.serverUrl);
            if (urlResponse.success) {
                this.attachmentData.meta.url
                    = urlResponse.data;
            }
            return urlResponse;
        });
    }
    createStorePathString() {
        const ticketId = this.attachmentData
            .meta.ticketId;
        const random = uuid_1.v4();
        const ext = this.attachmentData
            .meta.type.split('/')[1];
        return `${ticketId}/${random}.${ext}`;
    }
}
exports.default = Attachment;
