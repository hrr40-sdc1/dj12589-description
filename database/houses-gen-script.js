const faker = require('faker');
const fs = require('fs')
const file = fs.createWriteStream('database/houses-test.js')

var houses = [];
var count = 0;


var getHouses = function() {
  for (var i = 0; i < 100000; i++) {
    let house = {}
    house['title'] = faker.lorem.words();
    house['isEntirePlace'] = faker.random.boolean();
    house['location'] = `${faker.address.city()}`;
    house['host_name'] = `${faker.name.firstName()} ${faker.name.lastName()}`;
    house['host_photo'] = faker.image.imageUrl();
    house['rating'] = faker.random.number({min: 1, max: 5});
    house['description'] = faker.lorem.sentence();
    house['space_description'] = faker.lorem.sentence()
    house['guest_description'] = faker.lorem.sentence()
    house['other_description'] = faker.lorem.sentence()
    houses.push(JSON.stringify(house))
  }
  houses = houses.join(', ' + '\n')

  fs.writeFile('database/houses-test.js', houses, {flag: 'r+'}, (err) => {
    if(err) throw err;
    count += 100000
    if(count < 1000000) {
      getHouses()
    }
  })
}

getHouses()

// houses.forEach(house => {
//   house = houses.join(', ')
//   console.log('HOUSE', JSON.stringify(house))
//   // fs.writeFile('database/houses-test.js', JSON.stringify(house) + '\n', (err) => {
//   //   if(err) throw err;
//   //   console.log('house appended!', house)
//   // })
// })
