
import * as passport from 'passport'
import * as PassportLocal from 'passport-local'
import Interactors from '../interactors/Interactors';

const LocalStrategy = PassportLocal.Strategy

export default (app:any)=>{
    passport.use(new LocalStrategy(
        { 
          usernameField: 'email',
          passReqToCallback: true  
        },
        async (req, email,password, done) => {
          // here is where you make a call to the database
          // to find the user based on their username or email address
          const user:any = await 
          new Interactors()
          .getUserWithEmailPassword(email,password)

          if(user && user.success && user.data){
            done(null, user.data.accountData)
          }
          else{
            done(null, false)
          }
        }
      ));

      passport.serializeUser((user:any, done) => {
        // After getting the user by local strategy, here you
        // gonna give the passport an id(coulumn form db) 
        // to serialize the user
        // like done in following example
        // change second argument of done() for serial id of your own

        if(user){
          console.log('IN SERIALIZE')
          console.log(user)
          done(null, user.id)
        }
        else{ done(null, false) }
      });
      
      passport.deserializeUser(async (id:any, done) => {
        // Here you have to deserialize the logged in user
        // on their logout. You have to get the user of provided
        // id (by serialize) from the database. like in this example

        const user:any = await 
        new Interactors()
        .getUserWithId(id)

        console.log('USER')
        console.log(user)
        if(user && user.success){
          done(null, user.data.accountData)
        }
        else{
          done(null, false)
        }
      });

      app.use(passport.initialize())
      app.use(passport.session())
}