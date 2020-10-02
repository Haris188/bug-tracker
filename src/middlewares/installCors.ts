
import * as cors from 'cors'

export default (app:any)=>{
    app.use(cors({
        credentials:true, 
        origin:true
    }))
}