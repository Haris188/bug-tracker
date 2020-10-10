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
const Interactors_1 = require("../Interactors");
const TestDataStoreAccess_1 = require("../../entities/dataStoreAccess/TestDataStoreAccess");
describe('removeUser', () => {
    const ds = new TestDataStoreAccess_1.default();
    const interactors = new Interactors_1.default();
    describe('On user exist', () => {
        it('should not remove user from account in DB if Deleter is not Admin', () => __awaiter(void 0, void 0, void 0, function* () {
            yield interactors
                .removeUser({
                deleterId: '1',
                deleteeId: '2'
            });
            yield ds.setIfNotCreateRef('accounts');
            const readRes = yield ds.readWhere({ id: '2' });
            const user = readRes.data;
            expect(user.length).toBeGreaterThan(0);
        }));
        it('should remove user from account in DB if Deleter is Admin', () => __awaiter(void 0, void 0, void 0, function* () {
            yield interactors
                .removeUser({
                deleterId: '5',
                deleteeId: '2'
            });
            yield ds.setIfNotCreateRef('accounts');
            const readRes = yield ds.readWhere({ id: '2' });
            const user = readRes.data;
            expect(user).toHaveLength(0);
        }));
        it('should return false if deleter is not admin', () => __awaiter(void 0, void 0, void 0, function* () {
            const remRes = yield interactors
                .removeUser({
                deleterId: '1',
                deleteeId: '2'
            });
            expect(remRes.success).toBe(false);
        }));
    });
    describe('On user not-existent', () => {
        it('should return false in success', () => __awaiter(void 0, void 0, void 0, function* () {
            const remRes = yield interactors
                .removeUser({
                deleterId: '5',
                deleteeId: 'Non-Existent'
            });
            expect(remRes.success).toBe(false);
        }));
    });
});
