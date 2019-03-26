const mongoose = require('mongoose') // for db work
const Joi = require('joi')   // for input validation 
const {movieSchema} = require('./movie')
const {customerSchema} = require('./customer')
const JoiObjectId = require('joi-objectid')(Joi)


const rentalSchema = new mongoose.Schema({
  movie: {
    type: movieSchema,
    required: true
  },
  customer: {
    type: customerSchema,
    required: true
  }, 
  dateOut: {
    type: Date,
    default: Date.now,
    required: true
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
  
})

const Rental = mongoose.model('Rental', rentalSchema) // creating a document in the db


const validateRental = (rental) => {
  const schema = {
    customerId: JoiObjectId().required(),
    movieId: JoiObjectId().required()
  }

  return Joi.validate(rental, schema)
}

module.exports.Rental = Rental
module.exports.validate = validateRental