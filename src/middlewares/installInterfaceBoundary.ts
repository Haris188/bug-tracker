
import * as passport from 'passport'

export default (app)=>{
    
    app.get('/test',(req,res)=>{
        res.send('hello world')
    })

    app.post('/login', (req:any,res:any, next:any)=>{
        passport.authenticate('local',(err,user)=>{
            req.login(user, (err:any)=>{
                console.log('LOGIN')

                res.send({
                    success: true,
                    data: user
                })
                
                if(err){
                    res.send({
                        success:false,
                        data: 'login failed'
                    })
                }
            })
        })(req, res, next)
    })
}