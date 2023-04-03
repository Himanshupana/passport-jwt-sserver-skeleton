const path = require('path');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
// const PRIV_KEY = process.env.PRIV_KEY
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
// console.log(PRIV_KEY);

function issueJWT(user) {
  const userId = user.userId;

  const expiresIn = 10000;

  const payload = {
    sub: userId,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, user.email, { expiresIn: expiresIn, algorithm: 'HS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports.issueJWT = issueJWT;