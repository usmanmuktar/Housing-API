import express from 'express';
import config from '../config'; //going up one directory to Config
import middleware from '../middleware';
import initializeDb from '../db';
import housing from '../controller/housing';
import account from '../controller/account';

let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes
  router.use('/housing', housing({ config, db}));
  router.use('/account', account({ config, db}));

});

export default router; // exporting the router object
