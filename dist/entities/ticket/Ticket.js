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
const DataStoreGetter_1 = require("../dataStoreAccess/DataStoreGetter");
const FileStoreGetter_1 = require("../fileStoreAccess/FileStoreGetter");
const UserFactory_1 = require("../user/UserFactory");
class Ticket {
    constructor(ticketData) {
        this.fileStore = new FileStoreGetter_1.default()
            .getAccordingToEnv();
        this.dataStore = new DataStoreGetter_1.default()
            .getAccordingToEnv();
        this.ticketData = ticketData;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketRes = yield this.saveTicketToDataStore();
            return ticketRes.success
                ? yield this.getTicketWithId()
                : ticketRes;
        });
    }
    saveTicketToDataStore() {
        return __awaiter(this, void 0, void 0, function* () {
            const setRefResponse = yield this.dataStore
                .setIfNotCreateRef('tickets');
            return setRefResponse.success
                ? yield this.dataStore.write(this.ticketData)
                : setRefResponse;
        });
    }
    setUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const setRefResponse = yield this.dataStore
                .setIfNotCreateRef('tickets');
            return setRefResponse.success
                ? yield this.dataStore.updateWhere({ userId }, { id: this.ticketData.id })
                : setRefResponse;
        });
    }
    complete() {
        return __awaiter(this, void 0, void 0, function* () {
            const setRefResponse = yield this.dataStore
                .setIfNotCreateRef('tickets');
            return setRefResponse.success
                ? yield this.dataStore.updateWhere({ completed: true }, { id: this.ticketData.id })
                : setRefResponse;
        });
    }
    addAttachment(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const storeResponse = yield this
                .storeAttachmentToFileStore(file);
            return storeResponse.success
                ? yield this
                    .storeAttachmentPathToDataStore(storeResponse.data)
                : storeResponse;
        });
    }
    getAllAttachments() {
        return __awaiter(this, void 0, void 0, function* () {
            const setRefResponse = yield this
                .dataStore
                .setIfNotCreateRef(`attachments`);
            return setRefResponse.success
                ? yield this.dataStore.readWhere({ ticketId: this.ticketData.id })
                : setRefResponse;
        });
    }
    getAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataStore = new DataStoreGetter_1.default()
                .getAccordingToEnv();
            const setRef = yield dataStore
                .setIfNotCreateRef('comments');
            const getComments = setRef.success
                ? yield dataStore
                    .readWhere({ ticketid: this.ticketData.id })
                : setRef;
            const commentsWithUsernames = getComments.data.map((comment) => __awaiter(this, void 0, void 0, function* () {
                const user = yield new UserFactory_1.default()
                    .retrieveWithUserId(comment.userid);
                const userData = user.getData();
                return Object.assign(Object.assign({}, comment), { username: userData.data.accountData.name });
            }));
            return getComments.success
                ? { success: true, data: yield Promise.all(commentsWithUsernames) }
                : getComments;
        });
    }
    getTicketWithId() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataStore = new DataStoreGetter_1.default()
                .getAccordingToEnv();
            const refSet = yield dataStore
                .setIfNotCreateRef('tickets');
            const ticket = refSet.success
                ? yield dataStore
                    .readWhere({ id: this.ticketData.id })
                : refSet;
            if (ticket.success && ticket.data.length > 0) {
                ticket.data = ticket.data[0];
            }
            else {
                ticket.data = null;
            }
            return ticket;
        });
    }
    storeAttachmentToFileStore(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const setRefResponse = yield this
                .fileStore
                .setIfNotCreateRef(`attachments/${this.ticketData.id}`);
            return setRefResponse.success
                ? yield this.fileStore.write(file)
                : setRefResponse;
        });
    }
    storeAttachmentPathToDataStore(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const setRefResponse = yield this
                .dataStore
                .setIfNotCreateRef(`ticket_${this.ticketData.id}_attachments`);
            return setRefResponse.success
                ? yield this.dataStore.write({
                    path
                })
                : setRefResponse;
        });
    }
}
exports.default = Ticket;
