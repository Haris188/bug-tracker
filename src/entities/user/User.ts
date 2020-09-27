import QueryResponse from "../QueryResponse";

interface User {
    signUp(): Promise<QueryResponse>
    login(): Promise<QueryResponse>
}

export default User