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
const Authenticator_1 = require("../authenticator/Authenticator");
const DataStoreGetter_1 = require("../dataStoreAccess/DataStoreGetter");
const TicketDataRetriever_1 = require("../ticket/TicketDataRetriever");
class ProjectManager {
    constructor(userData) {
        this.dataStore = new DataStoreGetter_1.default()
            .getAccordingToEnv();
        this.userData = userData;
    }
    signUp() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Authenticator_1.default()
                .signUpProjectManager(this.userData);
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Authenticator_1.default()
                .signInAsProjectManager(this.userData);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const accountDeleteResponse = yield this.deleteAccountInfo();
            const userSpecificDeleteResponse = accountDeleteResponse.success
                ? yield this.deleteUserSpecificInfo()
                : accountDeleteResponse;
            return userSpecificDeleteResponse;
        });
    }
    addProjectWithId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataStore = new DataStoreGetter_1.default()
                .getAccordingToEnv();
            const userId = this.userData.accountData.id;
            const refResponse = yield dataStore
                .setIfNotCreateRef(`"id_${userId}_projects"`);
            return refResponse.success
                ? yield dataStore.write({
                    projectId
                })
                : refResponse;
        });
    }
    getAllProject() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectIds = yield this.getAllProjectIds();
            return projectIds.success
                ? yield this
                    .getProjectsWithIds(projectIds.data)
                : projectIds;
        });
    }
    getTicketsForProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketRetriever = new TicketDataRetriever_1.default();
            return yield ticketRetriever
                .getAllTicketsWhere({ projectid: projectId });
        });
    }
    getRole() {
        return this.userData
            .accountData.role;
    }
    getData() {
        return this.userData
            ? {
                success: true,
                data: this.userData
            }
            : {
                success: false,
                data: null
            };
    }
    getAllProjectIds() {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = this.userData.accountData.id;
            const setRefResponse = yield this.dataStore
                .setIfNotCreateRef(`"id_${userId}_projects"`);
            return setRefResponse.success
                ? yield this.dataStore
                    .readWhere({})
                : setRefResponse;
        });
    }
    getProjectsWithIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const setRefResponse = yield this.dataStore
                .setIfNotCreateRef('projects');
            const projects = ids.map((currentId) => __awaiter(this, void 0, void 0, function* () {
                const project = yield this
                    .dataStore
                    .readWhere({ id: currentId.projectid });
                return project.data[0];
            }));
            const resolved = yield Promise.all(projects);
            return setRefResponse.success
                ? { success: true, data: resolved }
                : setRefResponse;
        });
    }
    deleteAccountInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataStore = new DataStoreGetter_1.default()
                .getAccordingToEnv();
            const refResponse = yield dataStore
                .setIfNotCreateRef('accounts');
            return refResponse
                ? yield dataStore.deleteWhere({
                    id: this.userData.accountData.id
                })
                : refResponse;
        });
    }
    deleteUserSpecificInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataStore = new DataStoreGetter_1.default()
                .getAccordingToEnv();
            const refResponse = yield dataStore
                .setIfNotCreateRef('projectManagers');
            return refResponse
                ? yield dataStore.deleteWhere({
                    userId: this.userData.accountData.id
                })
                : refResponse;
        });
    }
}
exports.default = ProjectManager;
