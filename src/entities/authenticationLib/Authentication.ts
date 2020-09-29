import QueryResponse from "../QueryResponse";

interface Authentication{
    signInWithEmailPassword(email,password):Promise<QueryResponse>
}

export default Authentication