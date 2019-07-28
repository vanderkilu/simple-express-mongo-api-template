const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../user/user.model');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done)=> {
    try {
        const user = await User.findOne({email})
        if (!user) {
            return done(null, false, {message: 'user not found'})
        }
        const isPasswordValid = await user.checkPassword(password)
        if (!isPasswordValid) {
            return done(null, false, {message: 'invalid password'})
        }
        return done(null,user, {message: 'logged in successfully'})
    }
    catch(err) {
        return done(err)
    }
}))
