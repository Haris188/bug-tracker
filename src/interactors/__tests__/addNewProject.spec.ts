import TestDataStoreAccess from '../../entities/dataStoreAccess/TestDataStoreAccess'
import Interactors from '../Interactors'

const mockProjectData = {
    "project":{
        "name": "Review of Frameworks",
        "description": "A framework for hybrid apps"
    },
    "users":[
        "2"
    ]
}

describe('addNewProject', () => {
    let res
    const db = new TestDataStoreAccess()
    let projectId

    beforeAll(async()=>{
        res = await new Interactors()
        .addNewProject(mockProjectData)
    })

    it('should add project to projects in DB', async()=>{
        await db.setIfNotCreateRef('projects')

        const projectRead = await
        db.readWhere(mockProjectData.project)

        expect(projectRead.data[0])
        .toMatchObject(mockProjectData.project)

        projectId = projectRead.data[0].id
    })

    it('should add projectId to users in db', async()=>{
        await db.setIfNotCreateRef(`"id_2_projects"`)

        const read = await
        db.readWhere({projectId: projectId})

        expect(read.data[0].projectId)
        .toBe(projectId)

        console.log(read)
    })

    it('should return the project in response',()=>{
        expect(res.data)
        .toMatchObject(mockProjectData.project)
    })
})
