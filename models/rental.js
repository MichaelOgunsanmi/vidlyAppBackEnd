const mongoose = require('mongoose') // for db work
const Joi = require('joi')
const moment = require('moment')

const {customerSchema} = require('./customer')
const JoiObjectId = require('joi-objectid')(Joi)


const rentalSchema = new mongoose.Schema({
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }   
    }),
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


rentalSchema.statics.lookup = function (customerId, movieId) {
  return this.findOne({
    'customer._id': customerId,
    'movie._id': movieId
})}

rentalSchema.methods.return = function () {
  this.dateReturned = new Date()

  const rentalDays = moment().diff(this.dateOut, 'days') 
  this.rentalFee = rentalDays * this.movie.dailyRentalRate
}

const Rental = mongoose.model('Rental', rentalSchema)

const validateRental = (rental) => {
  const schema = {
    customerId: JoiObjectId().required(),
    movieId: JoiObjectId().required()
  }

  return Joi.validate(rental, schema)
}

module.exports.Rental = Rental
module.exports.validate = validateRental
