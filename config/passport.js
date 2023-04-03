const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const PRIV_KEY = process.env.PRIV_KEY
const models = require('../models/db')

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration : false,
    secretOrKey: PRIV_KEY,
    // algorithms: ['RS256']
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            console.log("passport::",passport);
            console.log("ok", jwt_payload);

            models.Users.findOne({ userID: jwt_payload.sub }).then((user, err) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        })
    );
}
