import ProjectData from "./ProjectData";
import Project from './Project'
import {v4 as uuid} from 'uuid'

class ProjectFactory{
    createProjectFromData(projectData:ProjectData){
        return new Project(projectData)
    }

    createProjectFromDataWithId(projectData){
        projectData.project.id = uuid()

        return this
        .createProjectFromData(projectData)
    }
}

export default ProjectFactory