"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const PassportLocal = require("passport-local");
const Interactors_1 = require("../interactors/Interactors");
const LocalStrategy = PassportLocal.Strategy;
exports.default = (app) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        // here is where you make a call to the database
        // to find the user based on their username or email address
        const user = yield new Interactors_1.default()
            .getUserWithEmailPassword(email, password);
        if (user && user.success && user.data) {
            done(null, user.data.accountData);
        }
        else {
            done(null, false);
        }
    })));
    passport.serializeUser((user, done) => {
        // After getting the user by local strategy, here you
        // gonna give the passport an id(coulumn form db) 
        // to serialize the user
        // like done in following example
        // change second argument of done() for serial id of your own
        if (user) {
            console.log('IN SERIALIZE');
            console.log(user);
            done(null, user.id);
        }
        else {
            done(null, false);
        }
    });
    passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        // Here you have to deserialize the logged in user
        // on their logout. You have to get the user of provided
        // id (by serialize) from the database. like in this example
        const user = yield new Interactors_1.default()
            .getUserWithId(id);
        console.log('USER');
        console.log(user);
        if (user && user.success) {
            done(null, user.data.accountData);
        }
        else {
            done(null, false);
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};
