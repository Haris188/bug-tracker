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
const mockSignupData = {
    "accountData": {
        "email": "ham@gmail.com",
        "password": "anypass",
        "name": "ham",
        "role": "admin"
    },
    "userSpecificData": {
        "department": "system admin"
    }
};
describe('Signup', () => {
    let signUpRes;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        signUpRes = yield new Interactors_1.default()
            .signUp(mockSignupData);
    }));
    const ds = new TestDataStoreAccess_1.default();
    let accountId;
    it('should store account data in accounts on DB', () => __awaiter(void 0, void 0, void 0, function* () {
        yield ds.setIfNotCreateRef('accounts');
        const read = yield ds
            .readWhere(mockSignupData.accountData);
        accountId = read.data[0].id;
        expect(read.data[0])
            .toMatchObject(mockSignupData.accountData);
    }));
    it('should store accountInfo in account specific path in DB', () => __awaiter(void 0, void 0, void 0, function* () {
        yield ds.setIfNotCreateRef('admins');
        const read = yield ds
            .readWhere({ userId: accountId });
        expect(read.data[0])
            .toBeDefined();
    }));
    it('should return object with success and data properties', () => {
        expect(signUpRes).toBeDefined();
        expect(signUpRes.success).toBeDefined();
        expect(signUpRes.data).toBeDefined();
    });
});
