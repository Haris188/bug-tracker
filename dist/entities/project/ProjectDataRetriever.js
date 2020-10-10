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
class ProjectDataRetriever {
    getUsersForProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataStore = new DataStoreGetter_1.default()
                .getAccordingToEnv();
            const setRefRes = yield dataStore
                .setIfNotCreateRef(`"project_${projectId}_users"`);
            return setRefRes.success
                ? yield dataStore.readWhere({})
                : setRefRes;
        });
    }
}
exports.default = ProjectDataRetriever;
