const models = require('../../models/db');
const { validationResult } = require('express-validator');
const passport = require('passport')
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.register =async (req, res, next) =>{
    try {
        const errors = validationResult(req);
        console.log("errors::", errors);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        else {
            let user = {
                email: req.body.email,
                username: req.body.username,
                password: "password",
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }

            await bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    user.password = hash
                    user.salt = salt    
                    console.log("user::",user);
                    // console.log("user", user, "salt", salt);
                    // bcrypt.compare(req.body.password, hash, function(err, result) {
                    //    console.log("result",result);
                    // });

                    models.Users.create(user).then(user => {
                        res.send({
                            status: 200,
                            data: user,
                            message: "User registration successful!"
                        })
                    }).catch(err => {
                        res.send({
                            message: "Error occured while creating user!"
                        })
                    })
                });
            });
        }
    } catch {
        res.send({ err: "err" })
    }
}