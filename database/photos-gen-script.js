const faker = require('faker');
const fs = require('fs')
const file = fs.createWriteStream('database/photos.js')

var photos = [];

for (var i = 0; i < 5; i++) {
  let photo = {}
  photo['filePath'] = faker.image.imageUrl();
  photos.push(photo)
}

console.log(photos)
