const Purgecss = require('purgecss')
const fs = require('fs')

const purgeCss = new Purgecss({
  content: ['index.html'],
  css: ['index.css']
})
const result = purgeCss.purge()

fs.writeFile('index.css', result[0].css, function (err) {
  if (err) {
    return console.log(err)
  }
})
