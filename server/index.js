const express = require('express');

const House = require('./../database/House.js');
const Photo = require('./../database/Photo.js');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
// serve static image files in public if necessary
app.use(express.static(__dirname + '/../public'));


// API Endpoints
app.get('/houses/:id', (req, res, next) => {
  var houseId = req.params.id;

  House.findOne({ house_id: houseId }).populate('photos').exec((err, house) => {
    if (err) {
      console.log('error fetching this house', err);
      res.status(400).json({ success: false, message: 'Could not fetch this House from our Database' });
    } else {
      res.status(200).json(house);
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Housemania Server is running at port ${port}`);
});
