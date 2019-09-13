const $ = require('jquery')

var imagesToStore = [];
const fetch = require('node-fetch');

let urls = [];
let urlString = ''

function getImage() {
    fetch(`https://loremflickr.com/320/240/houses`)
      .then((result) => {
        urls.push(result.url)

        if (urls.length < 1000) {
          getImage()
        } else {
            for (var i = 0; i < urls.length; i++) {
              urlString += urls[i] + '\n'
            }
            console.log('urlString', urlString)
          }
      })
}

getImage()
