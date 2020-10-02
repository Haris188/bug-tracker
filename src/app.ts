import * as express from 'express'
import * as dotenv from 'dotenv'
import middlewares from './middlewares'

dotenv.config()

export default ()=>{
    const app = express()
    const port = process.env.PORT

    middlewares.installParsers(app)
    middlewares.installSession(app)
    middlewares.installPassport(app)
    middlewares.installCors(app)
    middlewares.installInterfaceBoundary(app)

    app.listen(port, ()=>{
        console.log(`Server has started on port ${port}`)
    })
}
