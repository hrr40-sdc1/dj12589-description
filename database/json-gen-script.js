const faker = require('faker');
const fs = require('fs');

//To scale up/down for testing.
const count = 100;
const housesFile = fs.createWriteStream('database/json-houses.json');
const bedroomsFile = fs.createWriteStream('database/json-bedrooms.json');
const photosFile = fs.createWriteStream('database/json-photos.json');

const getHouses = function() {
  (async() => {
      housesFile.write(`{"docs": [`);
        for (var i = 1; i <= count; i++) {
          const house_id = i;
          const title = faker.lorem.words();
          const isEntirePlace = faker.random.boolean();
          const location = `${faker.address.city()}`;
          const host_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
          const host_photo = faker.image.imageUrl();
          const rating = faker.random.number({min: 1, max: 5});
          const description = faker.lorem.sentence();
          const space_description = faker.lorem.sentence();
          const guest_description = faker.lorem.sentence();
          const other_description = faker.lorem.sentence();
          const amenity1 = faker.random.number({ min: 1, max: 10 });
          const amenity2 = faker.random.number({ min: 1, max: 10 });
          const amenity3 = faker.random.number({ min: 1, max: 10 });
          const amenity4 = faker.random.number({ min: 1, max: 10 });
          const currentHouse = `{"houseId": ${house_id}, "title": "${title}", "isEntirePlace": ${isEntirePlace}, "location": "${location}", "host_name": "${host_name}", "host_photo": "${host_photo}", "rating": ${rating}, "description": "${description}", "space_description": "${space_description}", "guest_description": "${guest_description}", "other_description": "${other_description}", "amenity1": "${amenity1}", "amenity2": "${amenity2}", "amenity3": "${amenity3}", "amenity4": "${amenity4}"}`
          if((i !== count) && !housesFile.write(currentHouse + ',\n', {flag: 'r+'})) {
            await new Promise(resolve => housesFile.once('drain', resolve));
          } else if ((i === count) && !housesFile.write(currentHouse + ` ]}`, {flag: 'r+'})) {
            await new Promise(resolve => housesFile.once('drain', resolve));
          }
        }
  })();
}

const getBedrooms = function() {
    (async() => {
      bedroomsFile.write(`{"docs": [`);
      // each room can have 1-2 beds of different sizes.
      for (var i = 1; i <= count * 3; i++) {
        const house_id = faker.random.number({ min: 1, max: 1000000});
        const numberOfGuests = faker.random.number({min: 1, max: 10});
        const bathroom = faker.random.number({min: 1, max: 3});
        const bedSize = faker.random.number({ min: 1, max: 3 })
        const bed2Size = faker.random.number({ min: 0, max: 3 })
        const currentBedroom = `{"houseId": ${house_id}, "numberOfGuests": ${numberOfGuests}, "bathroom": ${bathroom}, "bedSize": ${bedSize}, "bed2Size": ${bed2Size}}`;
        if((i !== count * 3) && !bedroomsFile.write(currentBedroom + ',\n', {flag: 'r+'})) {
          await new Promise(resolve => bedroomsFile.once('drain', resolve));
        } else if ((i === count * 3) && !bedroomsFile.write(currentBedroom + ` ]}`, {flag: 'r+'})) {
          await new Promise(resolve => bedroomsFile.once('drain', resolve));
        }
      }
    })();
}

const getPhotos = function() {
  (async() => {
    photosFile.write(`{"docs": [`);
    for (var i = 1; i <= count * 4; i++) {
      const photoId = i;
      const photoUrl = faker.random.number({min: 1, max: 1000})
      const houseId = faker.random.number({min: 1, max: 10000000})
      const currentPhoto = `{"photoId": ${photoId}, "photoUrl": ${photoUrl}, "houseId": ${houseId}}`;
      if((i !== count * 4) && !photosFile.write(currentPhoto + ',\n', {flag: 'r+'})) {
        await new Promise(resolve => photosFile.once('drain', resolve));
      } else if ((i === count * 4) && !photosFile.write(currentPhoto + ` ]}`, {flag: 'r+'})) {
        await new Promise(resolve => photosFile.once('drain', resolve));
      }
    }
  })();
}


getHouses();
getBedrooms();
getPhotos();