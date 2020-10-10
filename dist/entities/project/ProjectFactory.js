"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = require("./Project");
const uuid_1 = require("uuid");
class ProjectFactory {
    createProjectFromData(projectData) {
        return new Project_1.default(projectData);
    }
    createProjectFromDataWithId(projectData) {
        projectData.project.id = uuid_1.v4();
        return this
            .createProjectFromData(projectData);
    }
}
exports.default = ProjectFactory;
