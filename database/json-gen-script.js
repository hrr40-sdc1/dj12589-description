const faker = require('faker');
const fs = require('fs');
const nano = require('nano')('http://dj125:acdbhd@localhost:5984')

//To scale up/down for testing.
const total = 10000;
let currentCount = 0;

const housesDb = nano.db.use('houses');
const bedroomsDb = nano.db.use('bedrooms');
const photosDb = nano.db.use('photos');

const getHouses = function() {
  (async() => {
        var values = [];
        for (var i = 1; i <= 10000; i++) {
          var currentHouse = {
            house_id: i,
            title: faker.lorem.words(),
            isEntirePlace: faker.random.boolean(),
            location: faker.address.city(),
            host_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            host_photo: faker.image.imageUrl(),
            rating: faker.random.number({min: 1, max: 5}),
            description: faker.lorem.sentence(),
            space_description: faker.lorem.sentence(),
            guest_description: faker.lorem.sentence(),
            other_description: faker.lorem.sentence(),
            amenity1: faker.random.number({ min: 1, max: 10 }),
            amenity2: faker.random.number({ min: 1, max: 10 }),
            amenity3: faker.random.number({ min: 1, max: 10 }),
            amenity4: faker.random.number({ min: 1, max: 10 })
          }
          values.push(currentHouse)
        }
          housesDb.bulk({docs: values})
            .then((body) => {
              currentCount += 10000;
              if (currentCount < total) {
               getHouses()
              }
            })
            .catch(err => {
              console.log('Error writing houses!', err)
            })
  })();
}

const getBedrooms = function() {
    (async() => {
      // each room can have 1-2 beds of different sizes.
      var values = [];
      for (var i = 1; i <= 10000; i++) {
        var currentBedroom = {
          house_id: faker.random.number({ min: 1, max: 1000000}),
          numberOfGuests: faker.random.number({min: 1, max: 10}),
          bathroom: faker.random.number({min: 1, max: 3}),
          bedSize: faker.random.number({ min: 1, max: 3 }),
          bed2Size: faker.random.number({ min: 0, max: 3 })
        }
        values.push(currentBedroom);
      }
      bedroomsDb.bulk({docs: values})
        .then(body => {
          currentCount += 10000
          if (currentCount < total * 3) {
            getBedrooms()
          }
        })
        .catch(err => {
          console.log('Error writing bedrooms!', err);
        })
    })();
}

const getPhotos = function() {
  (async() => {
    var values = [];
    for (var i = 1; i <= 10000; i++) {
      var currentPhoto = {
         photoId: i,
         photoUrl: faker.random.number({min: 1, max: 1000}),
         houseId: faker.random.number({min: 1, max: 10000000})
      }
      values.push(currentPhoto)
    }
      photosDb.bulk({docs: values})
        .then(body => {
          currentCount += 10000
          if (currentCount < total * 4) {
            getPhotos()
          }
        })
        .catch(err => {
          console.log('Error writing photos!', err);
        })
  })();
}


// getHouses();
// getBedrooms();
getPhotos();

