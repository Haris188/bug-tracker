import QueryResponse from "../QueryResponse";

interface User {
    signUp(): Promise<QueryResponse>
}

export default User