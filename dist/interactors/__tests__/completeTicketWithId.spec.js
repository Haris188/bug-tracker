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
const mockTicketId = '1';
describe('completeTicketWithId', () => {
    let res;
    const db = new TestDataStoreAccess_1.default();
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        res = yield new Interactors_1.default()
            .completeTicketWithId(mockTicketId);
    }));
    it('should update completed to true for provided ticket id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield db.setIfNotCreateRef('tickets');
        const ticketRead = yield db.readWhere({ id: mockTicketId });
        expect(ticketRead.data[0].completed)
            .toBe(true);
    }));
});
