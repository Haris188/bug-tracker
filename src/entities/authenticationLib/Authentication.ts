import QueryResponse from "../QueryResponse";

interface Authentication{
    signInWithEmailPassword(email,password):Promise<QueryResponse>
    checkIsLoggedInWithUserId(userId):Promise<QueryResponse>
}

export default Authentication