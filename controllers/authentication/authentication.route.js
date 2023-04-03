const authentication = require('./authentication.controller');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const passport = require('passport')
const models = require('../../models/db')
const jsonwebtoken = require('jsonwebtoken');
const PRIV_KEY = process.env.PRIV_KEY
const issueJWT = require('../../helpers/jwt.helper')
const myPassport = require("../../config/passport")

// Validate an existing user and issue a JWT
router.post('/login', async function (req, res, next) {
    models.Users.findOne({ where: { email: req.body.email } }).then(async result => {

        let user
        let userObj
        if (result && result.dataValues) {
            user = result.dataValues
            console.log("user::", user);
        }
        if (!user) {
            return res.status(401).json({ success: false, msg: "could not find user" });
        }
        let isValid = await validPassword(req.body.password, user.password, user.salt);
        console.log("isValid", isValid);

        if (isValid) {
            // const tokenObject = issue
            userObj = {
                userId: user.userID,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt
            }
            const userId = userObj.userId;

            const expiresIn = '10s';
            console.log("id", userObj.userId);
            const payload = {
                iat: Date.now(),
                sub: userId
            };

            const signedToken = "Bearer " + jsonwebtoken.sign(payload, process.env.PRIV_KEY, { expiresIn: expiresIn, });
            res.status(200).json({ success: true, token: signedToken, expiresIn: expiresIn, user: userObj });

        } else {
            res.status(401).json({ success: false, msg: "you entered the wrong password" });
        }

    }).catch((err) => {
        console.log(err);
    });
});

router.get("/protectd-route", passport.authenticate('jwt', { session: false, }), async (req, res, next) => {
    console.log("req::",req._passport);
    res.send("user/getuser.pug")
    next()
})

router.get('/logout', (req, res, next) => {
    console.log("ok", req.sessionStore);
    console.log("lko", req.sessionStore);

    req.logout(function (err) {
        if (err) { return next(err); }
        console.log(req.sessionStore);
        res.send("logout");
    });
})

module.exports = router;

async function validPassword(password, hash, salt) {
    console.log("password", password, "salt", salt, "hash", hash);
    var hashed
    // try {
    hashed = await bcrypt.hash(password, salt)
    // } catch (error) {
    //     return false
    // }
    console.log(hash, hashed);
    if (hash == hashed) {
        return true
    } else {
        return false
    }
}
