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
const Ticket_1 = require("./Ticket");
const uuid_1 = require("uuid");
const DataStoreGetter_1 = require("../dataStoreAccess/DataStoreGetter");
class TicketFactory {
    constructor() {
        this.dataStore = new DataStoreGetter_1.default()
            .getAccordingToEnv();
    }
    createTicketFromData(ticketData) {
        return new Ticket_1.default(ticketData);
    }
    createTicketFromDataWithId(ticketData) {
        ticketData.id = uuid_1.v4();
        return this.createTicketFromData(ticketData);
    }
    retrieveTicketWithId(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketData = yield this
                .getTicketDataFromDataStoreWithId(ticketId);
            return ticketData.success
                ? this.createTicketFromData(ticketData.data)
                : ticketData;
        });
    }
    getTicketDataFromDataStoreWithId(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const setRefResponse = yield this
                .dataStore
                .setIfNotCreateRef('tickets');
            const readResponse = setRefResponse.success
                ? yield this
                    .dataStore
                    .readWhere({ id: ticketId })
                : setRefResponse;
            return this
                .formatReadResponse(readResponse);
        });
    }
    formatReadResponse(readResponse) {
        if (readResponse.success) {
            if (readResponse.data.length > 0) {
                readResponse.data
                    = readResponse.data[0];
            }
            else {
                readResponse.data = null;
            }
        }
        return readResponse;
    }
}
exports.default = TicketFactory;
