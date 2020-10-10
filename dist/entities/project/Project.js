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
const UserFactory_1 = require("../user/UserFactory");
class Project {
    constructor(projectData) {
        this.dataStore = new DataStoreGetter_1.default()
            .getAccordingToEnv();
        this.projectData = projectData;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const { project, users } = this.projectData;
            const projectId = project.id;
            const projectSaveResponse = yield this
                .saveProjectToDataStore(project);
            const userSave = projectSaveResponse.success
                ? yield this
                    .saveProjectIdToUsers(projectId, users)
                : projectSaveResponse;
            return userSave.success
                ? yield this.getProjectWithId(projectId)
                : userSave;
        });
    }
    getProjectWithId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const refSetResponse = yield this
                .dataStore.setIfNotCreateRef('projects');
            const projectFetch = refSetResponse.success
                ? yield this.dataStore
                    .readWhere({ id: projectId })
                : refSetResponse;
            if (projectFetch.success
                && projectFetch.data.length > 0) {
                projectFetch.data = projectFetch.data[0];
            }
            return projectFetch;
        });
    }
    saveProjectToDataStore(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const refSetResponse = yield this
                .dataStore.setIfNotCreateRef('projects');
            return refSetResponse.success
                ? yield this.dataStore.write(project)
                : refSetResponse;
        });
    }
    saveProjectIdToUsers(projectId, userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let saveProjectIdsSuccess = true;
            const dataStore = new DataStoreGetter_1.default()
                .getAccordingToEnv();
            const setRefRes = yield dataStore
                .setIfNotCreateRef(`"project_${projectId}_users"`);
            userIds.forEach((userId) => __awaiter(this, void 0, void 0, function* () {
                const user = yield this
                    .getUserWith(userId);
                if (user) {
                    const saveResponse = yield user.addProjectWithId(projectId);
                    const userToProjectRes = setRefRes.success
                        ? yield dataStore
                            .write({ userId: user.getData().data.accountData.id })
                        : setRefRes;
                    saveProjectIdsSuccess
                        = saveProjectIdsSuccess
                            && saveResponse.success
                            && userToProjectRes.success;
                }
            }));
            return {
                success: saveProjectIdsSuccess,
                data: null
            };
        });
    }
    getUserWith(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new UserFactory_1.default()
                    .retrieveWithUserId(userId);
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
}
exports.default = Project;
