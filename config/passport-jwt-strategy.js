const passport=require('passport');
const JWTstrategy=require('passport-jwt').Strategy;
const extractJWT=require('passport-jwt').ExtractJwt;

 const User = require('../models/users');

let opts={
    jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:'codeial'
}
passport.use(new JWTstrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){

        if(err){
            console.log("error in finding the user from jwt")
        }
        if(user){
            return done(null,user)
        }else{
            return done(null,false)
        }
    })
}))

module.exports=passport;