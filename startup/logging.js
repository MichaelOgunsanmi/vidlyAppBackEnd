const winston = require('winston')
//require('winston-mongodb')
require('express-async-errors') 



module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({ 
      filename: 'uncaughtExceptions.log'
    }))

  process.on('unhandledRejections', (ex) => {
    throw ex
  })

  winston.add( 
    new winston.transports.File({ 
      filename: 'logfile.log',
      level: 'info'
    }))
  // winston.add( new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly'}))

}

/* 
express-async-errorsinvolves handling erors and logging these errors. 
That is why it is required here 
winston-mongodb is used for logging to mongodb
but commented out for testing purposes
*/