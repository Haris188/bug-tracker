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
const Admin_1 = require("./Admin");
const Developer_1 = require("./Developer");
const Tester_1 = require("./Tester");
const ProjectManager_1 = require("./ProjectManager");
const DataStoreGetter_1 = require("../dataStoreAccess/DataStoreGetter");
const uuid_1 = require("uuid");
class UserFactory {
    createUserFromData(userData) {
        try {
            const type = userData
                .accountData
                .role;
            switch (type) {
                case 'admin':
                    return new Admin_1.default(userData);
                case 'developer':
                    return new Developer_1.default(userData);
                case 'tester':
                    return new Tester_1.default(userData);
                case 'projectManager':
                    return new ProjectManager_1.default(userData);
                default:
                    throw new Error('Invalid user type');
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    createUserFromDataWithId(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = uuid_1.v4();
            let { accountData, userSpecificData } = userData;
            accountData = Object.assign(Object.assign({}, userData.accountData), { id });
            userSpecificData = Object.assign(Object.assign({}, userData.userSpecificData), { userId: id });
            const idAttachedData = Object.assign(Object.assign({}, userData), { accountData,
                userSpecificData });
            return yield this
                .createUserFromData(idAttachedData);
        });
    }
    retrieveWithEmailPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDataResponse = yield this.getUserDataFromAccountsWith({
                email,
                password
            });
            return this.createUserFromData({
                accountData: userDataResponse.data[0],
                userSpecificData: {}
            });
        });
    }
    retrieveWithUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDataResponse = yield this.getUserDataFromAccountsWith({
                id: userId
            });
            return this.createUserFromData({
                accountData: userDataResponse.data[0],
                userSpecificData: {}
            });
        });
    }
    getUserDataFromAccountsWith(whereFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataStore = yield new DataStoreGetter_1.default()
                .getAccordingToEnv();
            const refSetResponse = yield dataStore.setIfNotCreateRef('accounts');
            const accountData = refSetResponse.success
                ? yield dataStore.readWhere(whereFields)
                : refSetResponse;
            return accountData;
        });
    }
}
exports.default = UserFactory;
