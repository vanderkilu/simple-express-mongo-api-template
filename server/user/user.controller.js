const passport = require('passport')
const User = require('./user.model')


exports.login = async (req, res, next)=> {
    passport.authenticate('local', {session: false}, (err, user, message)=>{
        if (err || !user) return next(err)
        req.login(user, {session: false}, (err)=> {
            if (err) return next(err)
            user.token = user.generateJWT()
            return res.json({user: user.toAuthJSON()})
        })
    })(req, res, next)
}

exports.register = async (req, res, next) => {
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            handle: req.body.username,
            image: req.body.image,
       })
       return res.json({user: user.toAuthJSON()})
    }
    catch(err) {
        return next(err)
    }
   
   
}