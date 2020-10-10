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
const mockProjectData = {
    "project": {
        "name": "Review of Frameworks",
        "description": "A framework for hybrid apps"
    },
    "users": [
        "2"
    ]
};
describe('addNewProject', () => {
    let res;
    const db = new TestDataStoreAccess_1.default();
    let projectId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        res = yield new Interactors_1.default()
            .addNewProject(mockProjectData);
    }));
    it('should add project to projects in DB', () => __awaiter(void 0, void 0, void 0, function* () {
        yield db.setIfNotCreateRef('projects');
        const projectRead = yield db.readWhere(mockProjectData.project);
        expect(projectRead.data[0])
            .toMatchObject(mockProjectData.project);
        projectId = projectRead.data[0].id;
    }));
    it('should add projectId to users in db', () => __awaiter(void 0, void 0, void 0, function* () {
        yield db.setIfNotCreateRef(`"id_2_projects"`);
        const read = yield db.readWhere({ projectId: projectId });
        expect(read.data[0].projectId)
            .toBe(projectId);
        console.log(read);
    }));
    it('should return the project in response', () => {
        expect(res.data)
            .toMatchObject(mockProjectData.project);
    });
});
