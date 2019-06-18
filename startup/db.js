const winston = require('winston')
const mongoose = require('mongoose')
const config = require('config')


module.exports = function () {
  db = config.get('db')

  mongoose.set('useNewUrlParser', true)
  mongoose.set('useCreateIndex', true)
  
  mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`))
}