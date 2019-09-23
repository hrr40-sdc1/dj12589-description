require('newrelic');
const express = require('express');
require('dotenv').config();
var cors = require('./cors');
// var cors = require('cors');
const bodyParser = require('body-parser')

const { Pool, Client } = require('pg')

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: 'description',
  password: null,
  port: process.env.PGPORT,
})

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
  var houseId = Number(req.params.id);

  pool.query(`SELECT * FROM houses WHERE house_id = ${houseId};`, (err, results) => {
    if (err) {
      // console.log('Error getting house.', err)
      res.status(404).send({success: false, message: 'Could not fetch this house from our database.'});
    } else {
      // console.log('House results', results.rows[0])
      res.status(200).send(results.rows[0]);
    }
  })
});

app.post('/houses/:id', (req, res, next) => {
  const houseId = Number(req.params.id)
  const isEntirePlace = true
  //character constants need to be wrapped in single quotes
  const location = 'testlocation'

  pool.query(`INSERT INTO houses (house_id, location, isentireplace) VALUES (${houseId},'${location}',${isEntirePlace});`, (err, results) => {
    if (err) {
      // console.log('Error posting house.', err)
      res.status(404).send(err);
    } else {
      res.status(200).send(`{
        houseId: ${houseId},
        location: '${location}',
        isEntirePlace: ${isEntirePlace}
      }`);
    }
  })
});

app.put('/houses/:id', (req, res, next) => {
  const houseId = req.params.id
  var location = {location: 'Brisbane'}
      House.findOneAndUpdate({house_id: houseId}, location, (err, house) => {
        if (err) {
          res.send('Error updating house.');
        } else {
          res.send(location);
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

  var houseId = Number(req.params.id);

  pool.query(`SELECT * FROM photos WHERE house_id = ${houseId};`, (err, results) => {
    if (err) {
      // console.log('Error getting house.', err)
      res.status(404).send({success: false, message: 'Could not fetch photos for house from our database.'});
    } else {
      // console.log('House results', results.rows)
      res.status(200).send(results.rows);
    }
  })
});

app.post('/photos/houses/:id', (req, res, next) => {
  const houseId = Number(req.params.id)
  const photoId = 40000010;
  const photoUrl = 780

  pool.query(`INSERT INTO photos (house_id, photo_id, photoUrl) VALUES (${houseId}, ${photoId}, ${photoUrl});`, (err, results) => {
    if (err) {
      // console.log('Error posting photos.', err)
      res.status(404).send(err);
    } else {
      res.status(200).send(`{
        houseId: ${houseId},
        photo_id: '${photoId}',
        photoUrl: ${photoUrl}
      }`);
    }
  });
});

app.put('/photos/houses/:id', (req, res, next) => {
  const houseId = req.params.id
  var description = {desc: 'New description'}
      Photo.findOneAndUpdate({ house_id: houseId }, description, (err) => {
        if (err) {
          res.send('Error updating house.');
        } else {
          res.send(description);
        }
    })
});

app.delete('/photos/houses/:id', (req, res, next) => {
  const houseId = req.params.id
  Photo.deleteOne({ house_id: houseId }, (err, result) => {
    if (err || !result) {
      res.status(404).send('No photo found to delete.')
    } else {
      res.send('Photo successfully deleted.')
    }
  });
});

app.get('/bedrooms/houses/:id', (req, res, next) => {

  var houseId = Number(req.params.id);

  pool.query(`SELECT * FROM bedroomsTwo WHERE house_id = ${houseId} LIMIT 5;`, (err, results) => {
    if (err) {
      console.log('Error getting house.', err)
      res.status(404).send({success: false, message: 'Could not fetch photos for house from our database.'});
    } else {
      console.log('House results', results.rows)
      res.status(200).send(results.rows);
    }
  })
});

app.post('/bedrooms/houses/:id', (req, res, next) => {
  const houseId = Number(req.params.id)
  const numberOfGuests = 2
  const bathroom = 5
  const bedsize = 1
  const bed2size = 0

  pool.query(`INSERT INTO bedrooms (house_id, numberOfGuests, bathroom, bedsize, bed2size) VALUES (${houseId}, ${numberOfGuests}, ${bathroom}, ${bedsize}, ${bed2size});`, (err, results) => {
    if (err) {
      console.log('Error posting bedrooms.', err)
      res.status(404).send(err);
    } else {
      res.status(200).send(`{
        houseId: ${houseId},
        numberOfGuests: ${numberOfGuests},
        bathroom: ${bathroom},
        bedsize: ${bedsize},
        bed2size: ${bed2size}
      }`);
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
