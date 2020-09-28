import QueryResponse from "../QueryResponse";

interface User {
    signUp(): Promise<QueryResponse>
    login(): Promise<QueryResponse>
    checkIsLoggedIn(): Promise<QueryResponse>
    getRole(): String
    delete(): Promise<QueryResponse>
}

export default User