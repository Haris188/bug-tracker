
export default interface UserData{
    accountData: {
        id: string
        email: string
        name: string
        role: string
        password:string
    }
    userSpecificData: Object
}