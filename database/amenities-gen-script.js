const faker = require('faker');
const fs = require('fs')
const file = fs.createWriteStream('database/amenities.js')

var amenities = [];

for (var i = 0; i < 5; i++) {
  let currentAmenity = {}
  currentAmenity['category'] = faker.random.word();
  currentAmenity['item'] = faker.random.word();
  currentAmenity['description'] = faker.random.words();
  amenities.push(currentAmenity)
}

console.log('amenities', amenities)
