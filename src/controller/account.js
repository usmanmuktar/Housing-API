import mongoose from 'mongoose';
import { Router } from 'express';
import Account from '../model/account';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';

import { generateAccessToken, respond, authenticate }  from '../middleware/authmiddleware';

export default ({ config, db }) => {
  let api = Router();

  // 'account'
  api.post('/register', (req, res) => {
    Account.register(new Account({ username: req.body.email}), req.body.password, function(err, account) {
      if (err) {
        res.send(err);
      }

      passport.authenticate(
        'local', {
          session: false
        })(req, res, () => {
          res.status(200).send('Successfully created new Account');
        });
    });
  });


// 'account/login'
api.post('/login', passport.authenticate(
  'local', {
    session: false,
    scope: []
  }), generateAccessToken, respond);


// 'account/logout'
api.get('/logout', authenticate, (req, res) => {
  res.logout();
  res.status(200).send('Successfully logged out');
});

// used to get some information about logged in user. but you have to have users token to get here
api.get('/me', authenticate, (req, res) => {
  res.status(200).json(req.user);
});

return api;
}
