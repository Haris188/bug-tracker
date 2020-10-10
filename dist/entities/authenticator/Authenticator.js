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
const TestAuthentication_1 = require("../authenticationLib/TestAuthentication");
class Authenticator {
    constructor() {
        this.authenticationLib = new TestAuthentication_1.default();
    }
    signUpAdmin(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.signUpData = userData;
            this.initializeDataStore();
            const accountRes = yield this.storeAccountData();
            const adminRes = yield this.storeAdminData();
            const successData = [accountRes, adminRes];
            const successReport = this.createSuccessReportFrom(successData);
            return successReport;
        });
    }
    signUpDeveloper(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.signUpData = userData;
            this.initializeDataStore();
            const accountRes = yield this.storeAccountData();
            const developerRes = yield this.storeDeveloperData();
            const successData = [accountRes, developerRes];
            const successReport = this.createSuccessReportFrom(successData);
            return successReport;
        });
    }
    signUpTester(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.signUpData = userData;
            console.log('tester');
            this.initializeDataStore();
            const accountRes = yield this.storeAccountData();
            const testerRes = yield this.storeTesterData();
            const successData = [accountRes, testerRes];
            const successReport = this.createSuccessReportFrom(successData);
            return successReport;
        });
    }
    signUpProjectManager(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.signUpData = userData;
            this.initializeDataStore();
            const accountRes = yield this.storeAccountData();
            const projectManagerRes = yield this.storeProjectManagerData();
            const successData = [accountRes, projectManagerRes];
            const successReport = this.createSuccessReportFrom(successData);
            return successReport;
        });
    }
    signInAsAdmin(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.signIn(userData);
        });
    }
    signInAsDeveloper(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.signIn(userData);
        });
    }
    signInAsTester(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.signIn(userData);
        });
    }
    signInAsProjectManager(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.signIn(userData);
        });
    }
    signIn(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this
                .authenticationLib
                .signInWithEmailPassword(userData.accountData.email, userData.accountData.password);
        });
    }
    initializeDataStore() {
        const dataStore = new DataStoreGetter_1.default()
            .getAccordingToEnv();
        this.dataStore = dataStore;
    }
    storeAccountData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this
                .dataStore
                .setIfNotCreateRef('accounts');
            return yield this.dataStore
                .write(this.signUpData
                .accountData);
        });
    }
    storeAdminData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this
                .dataStore
                .setIfNotCreateRef('admins');
            return yield this.dataStore
                .write(this.signUpData
                .userSpecificData);
        });
    }
    storeDeveloperData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this
                .dataStore
                .setIfNotCreateRef('developers');
            return yield this.dataStore
                .write(this.signUpData
                .userSpecificData);
        });
    }
    storeTesterData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this
                .dataStore
                .setIfNotCreateRef('tester');
            return yield this.dataStore
                .write(this.signUpData
                .userSpecificData);
        });
    }
    storeProjectManagerData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this
                .dataStore
                .setIfNotCreateRef('projectManager');
            return yield this.dataStore
                .write(this.signUpData
                .userSpecificData);
        });
    }
    createSuccessReportFrom(successData) {
        let success = true;
        for (var index = 1; index < successData.length; index++) {
            const currentDataSuccess = successData[index].success;
            success = success && currentDataSuccess;
            if (!currentDataSuccess) {
                break;
            }
        }
        return {
            success,
            data: null
        };
    }
}
exports.default = Authenticator;
