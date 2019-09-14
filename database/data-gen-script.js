const faker = require('faker');
const fs = require('fs');

//To scale up/down for testing.
const count = 100;

 const getHouses = function() {
     const file = fs.createWriteStream('database/houses.csv', {encoding: 'utf8'})
     file.write('title,isEntirePlace,location,host_name,host_photo,rating,description,space_description,guest_description,other_description,amenity1,amenity2,amenity3,amenity4\n')

       for (var i = 1; i <= count; i++) {
         const house_id = i;
         const title = faker.lorem.words();
         const isEntirePlace = faker.random.boolean();
         const location = `${faker.address.city()}`;
         const host_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
         const host_photo = faker.image.imageUrl();
         const rating = faker.random.number({min: 1, max: 5});
         const description = faker.lorem.sentence();
         const space_description = faker.lorem.sentence()
         const guest_description = faker.lorem.sentence()
         const other_description = faker.lorem.sentence()
         const amenity1 = faker.random.number({ min: 1, max: 10 });
         const amenity2 = faker.random.number({ min: 1, max: 10 });
         const amenity3 = faker.random.number({ min: 1, max: 10 });
         const amenity4 = faker.random.number({ min: 1, max: 10 });
         const currentHouse = `${house_id},${title},${isEntirePlace},${location},${host_name},${host_photo},${rating},
         ${description},${space_description},${other_description},${amenity1},${amenity2},${amenity3},${amenity4}`
         file.write(currentHouse + '\n', {flag: 'r+'}, (err) => {
           if(err) console.log('Error writing house info:', err);
         })
     }
  }

const getBedrooms = function() {
    const file = fs.createWriteStream('database/bedrooms.csv')
    file.write('houseId,numberOfGuests,bathroom,bedsize,bed2size\n')
    // each room can have 1-2 beds of different sizes.
    for (var i = 1; i <= count * 3; i++) {
      const house_id = faker.random.number({ min: 1, max: 1000000})
      const numberOfGuests = faker.random.number({min: 1, max: 10});
      const bathroom = faker.random.number({min: 1, max: 3});
      const bedSize = faker.random.number({ min: 1, max: 3 })
      const bed2Size = faker.random.number({ min: 0, max: 3 })
      const currentBedroom = `${house_id},${numberOfGuests},${bathroom},${bedSize},${bed2Size}`;
      file.write(currentBedroom + '\n', {flag: 'r+'}, (err) => {
        if(err) console.log('Error writing bedroom:', err)
      })
    }
}


const getPhotos = function() {
    const file = fs.createWriteStream('database/photos.csv')
    file.write('photoId,photoUrl,houseId\n')
    for (var i = 1; i <= count * 4; i++) {
      const photo_id = i;
      const photoUrl = faker.random.number({min: 1, max: 1000})
      const house_id = faker.random.number({min: 1, max: 10000000})
      const currentPhoto = `${photo_id},${photoUrl},${house_id}`;
      file.write(currentPhoto + '\n', {flag: 'r+'}, (err) => {
        if(err) console.log('Error writing photo:', err)
      })
    }
}

getHouses()
getPhotos()
getBedrooms()
