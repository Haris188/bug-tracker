
import Authentication from './Authentication'

class TestAuthentication implements Authentication{
    async signInWithEmailPassword(email,password){
        return {
            success:true,
            data: null
        }
    }
}

export default TestAuthentication