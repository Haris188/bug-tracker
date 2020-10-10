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
describe('getUserWithEmailPassword', () => {
    describe('if user found,', () => {
        it('should return a user with the provided email and password', () => __awaiter(void 0, void 0, void 0, function* () {
            const userRes = yield new Interactors_1.default()
                .getUserWithId('1');
            const user = userRes.data.accountData;
            expect(user.email).toBeDefined();
            expect(user.password).toBeDefined();
            expect(user.id).toBeDefined();
            expect(user.role).toBeDefined();
            expect(user.name).toBeDefined();
        }));
    });
    describe('if user not found,', () => {
        it('should return an object with key success:false', () => __awaiter(void 0, void 0, void 0, function* () {
            const userRes = yield new Interactors_1.default()
                .getUserWithId('NonExistentId');
            expect(userRes).toBeDefined();
            expect(userRes.success).toBe(false);
        }));
    });
});
