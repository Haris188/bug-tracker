import QueryResponse from "../QueryResponse";

interface User {
    signUp(): Promise<QueryResponse>
    login(): Promise<QueryResponse>
    getRole(): String
    delete(): Promise<QueryResponse>
    addProjectWithId(projectId): Promise<QueryResponse>
    getData(): QueryResponse
}

export default User