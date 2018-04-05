import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60*60*24*30; // 30 days before reauthentication
const SECRET = "W3 Hav3 th3 Kn0w h0w"; // could be used to decode tokens

let authenticate = expressJwt({ secret: SECRET });

// next here gives u a hint that this is a middleware
let generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
  }, SECRET, {
    expiresIn: TOKENTIME // 30 days
  });
  next(); // this allows it to go to the handlers
}

let respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token
  });
}

module.exports = {
  authenticate,
  generateAccessToken,
  respond
}
