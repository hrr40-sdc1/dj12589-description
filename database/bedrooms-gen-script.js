const faker = require('faker');
const fs = require('fs')
const file = fs.createWriteStream('database/bedrooms.js')

var bedroomList = [];

for (var i = 0; i < 5; i++) {
  let bedrooms = {}
  bedrooms['numberOfGuests'] = faker.random.word();
  bedrooms['item'] = faker.random.word();
  bedrooms['room_id'] = faker.random.number({min: 1, max: 2});
  bedrooms['room_1_bed_1'] = faker.random.word();
  bedrooms['room_1_bed_2'] = faker.random.word();
  bedrooms['room_2_bed_1'] = faker.random.word();
  bedrooms['room_2_bed_2'] = faker.random.word();
  bedroomList.push(bedrooms)
}

console.log(bedroomList)
