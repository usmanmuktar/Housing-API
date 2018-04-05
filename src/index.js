import http from 'http'; // enable us create our server
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy; // Depending on the authentication used, could be facebook strategy gmail etc

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// middleware
// parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}));

// passport Config
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// api routes
app.use('/api', routes);

//let port = process.env.PORT || 3000;

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;
