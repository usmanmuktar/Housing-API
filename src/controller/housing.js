import mongoose from 'mongoose';
import { Router } from 'express';
import Housing from '../model/housing';

export default({ config, db }) => {
  let api = Router();

/**     CRUD
  Create Read Update Delete
**/

  // Create
  // '/housing/add'
  api.post('/add', (req, res) => {
    let newHouse = new Housing();
    newHouse.SaleID = req.body.SaleID;
    newHouse.ZPID = req.body.ZPID;
    newHouse.Address = req.body.Address;
    newHouse.Locality = req.body.Locality;
    newHouse.State = req.body.State;
    newHouse.ZipCode = req.body.ZipCode;
    newHouse.Latitude = req.body.Latitude;
    newHouse.Longitude = req.body.Longitude;

    newHouse.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Housing saved successfully'});
    });
  });

  // '/housing - Read all houses
  api.get('/', (req, res) => {
    Housing.find({}, (err, housings) => {
      if (err) {
        res.send(err);
      }
      res.send(housings);
    });
  });

  // '/housing/:State' - Read
  api.get('/State=:State', (req, res) => {
    Housing.find({'State': req.params.State}, (err, housings) => {
      if (err) {
        res.send(err);
      }
      res.send(housings);
    });
  });


  // 'housing/State=:State?Locality=:Locality' - Read
  api.get('/State=:State/Locality=:Locality', (req, res) => {
    Housing.find({'State': req.params.State, 'Locality': req.params.Locality}, (err, housings) => {
      if (err) {
        res.send(err);
      }
      res.send(housings);
    });
  });


  // 'housing/State=:State&Locality=:Locality&ZipCode=:ZipCode' - Read
  api.get('/State=:State/Locality=:Locality/ZipCode=:ZipCode', (req, res) => {
    Housing.find({'State': req.params.State, 'Locality': req.params.Locality, 'ZipCode': req.params.ZipCode}, (err, housings) => {
      if (err) {
        res.send(err);
      }
      res.send(housings);
    });
  });


  // 'housing/:id' - Read
  api.get('/:id', (req, res) => {
    Housing.findById(req.params.id, (err, housing) => {
      if (err) {
        res.send(err);
      }
      res.send(housing);
    });
  });


  // 'housing/:id' - update
  api.put('/:id', (req, res) => {
    Housing.findById(req.params.id, (err, housing) => {
      if (err) {
        res.send(err);
      }
      housing.name = req.body.name;
      housing.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Housing info updated"});
      });
    });
  });


  // 'housing/:id' - Delete
  api.delete('/:id', (req, res) => {
    Housing.findById(req.params.id, (err, housing) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (housing === null) {
        res.status(404).send("Housing not Found");
        return;
      }
      Housing.remove({
        _id: req.params.id
      }, (err, housing) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
      res.json({ message: "Housing successfully deleted!"});
      });
    });
  });


  return api;
}
