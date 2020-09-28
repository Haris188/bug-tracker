
import Authentication from './Authentication'

class TestAuthentication implements Authentication{
    async signInWithEmailPassword(email,password){
        return {
            success:true,
            data: null
        }
    }

    async checkIsLoggedInWithUserId(userId){
        return {
            success:true,
            data: true
        }
    }
}

export default TestAuthentication