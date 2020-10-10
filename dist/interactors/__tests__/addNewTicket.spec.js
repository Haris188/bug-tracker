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
const TestDataStoreAccess_1 = require("../../entities/dataStoreAccess/TestDataStoreAccess");
const Interactors_1 = require("../Interactors");
const mockTicketData = {
    "problem": "Alert Box not working",
    "description": "Gives an error",
    "priority": "high",
    "userId": "1",
    "projectId": "1",
    "completed": false
};
describe('addNewTicket', () => {
    let res;
    const db = new TestDataStoreAccess_1.default();
    let ticketId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        res = yield new Interactors_1.default()
            .addNewTicket(mockTicketData);
    }));
    it('should add tickets to projects in DB', () => __awaiter(void 0, void 0, void 0, function* () {
        yield db.setIfNotCreateRef('tickets');
        const ticketRead = yield db.readWhere(mockTicketData);
        expect(ticketRead.data[0])
            .toMatchObject(mockTicketData);
        ticketId = ticketRead.data[0].id;
    }));
    it('should return the ticket in response', () => {
        expect(res.data)
            .toMatchObject(mockTicketData);
    });
});
