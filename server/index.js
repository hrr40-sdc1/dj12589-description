const express = require('express');
require('dotenv').config();
var cors = require('./cors');
const bodyParser = require('body-parser')
const testHouse = require('./../database/test-data.js')

const House = require('./../database/House.js');
const Photo = require('./../database/Photo.js');

const app = express();

// Middlewares
app.use(cors);
app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
// serve static image files in public if necessary
app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// API Endpoints
app.get('/houses/:id', (req, res, next) => {
  var houseId = req.params.id;

  House.findOne({ house_id: houseId }, (err, house) => {
    if (err || !house) {
      console.log('error fetching this house', err);
      res.status(400).json({ success: false, message: 'Could not fetch this House from our Database' });
    } else {
      res.status(200).json(house);
    }
  });
});

app.post('/houses/:id', (req, res, next) => {
  const houseId = req.params.id
  House.findOne({ house_id: houseId }, (err, results) => {
    if (err || !results) {
      console.log('what i want to put in', testHouse.testHouse[0])
      House.create(testHouse.testHouse[0], (err, house) => {
        console.log('house in house create', house)
        if (err) {
          res.end('Error creating house.');
        } else {
          res.status(200).json(house);
        }
      })
    } else {
      res.end('House already exists.');
    }
  });
});

app.put('/houses/:id', (req, res, next) => {
  const houseId = req.params.id
  var location = {location: 'Brisbane'}
      House.findOneAndUpdate({house_id: houseId}, location, (err, house) => {
        if (err) {
          res.send('Error updating house.');
        } else {
          res.status(200).json(house);
        }
      })
});

app.delete('/houses/:id', (req, res, next) => {
  const houseId = req.params.id
  House.deleteOne({ house_id: houseId }, (err, result) => {
    if (err || !result) {
      res.status(404).send('No house found to delete.')
    } else {
      res.send('House successfully deleted.')
    }
  });
});

app.get('/photos/houses/:id', (req, res, next) => {
  var houseId = req.params.id;

  Photo.find({ house_id: houseId }, (err, photos) => {
    if (err) {
      console.log('error fetching this house photos', err);
      res.status(400).json({ success: false, message: 'Could not fetch house photos from our Database' });
    } else {
      res.status(200).json(photos);
    }
  });
});

app.get('/houses/search/:qry', (req, res, next) => {
  var qry = req.params.qry;

  House.find({ $or: [ { title: { $regex: qry, $options: 'i' } }, { location: { $regex: qry, $options: 'i' } } ] }, (err, houses) => {
    if (err) {
      console.log('error searching house', err);
      res.status(400).json({ success: false, message: 'Could not search House from our Database' });
    } else {
      res.status(200).json(houses);
    }
  }).limit(10);
});

const port = process.env.PORT || 3010;

app.listen(port, () => {
  console.log(`Housemania Server is running at port ${port}`);
});
