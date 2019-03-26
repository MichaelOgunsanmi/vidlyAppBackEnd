const mongoose = require('mongoose') // for db work
const Joi = require('joi')   // for input validation 
const {genreSchema} = require('./genre')
const JoiObjectId = require('joi-objectid')(Joi)


const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    default: 0,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    default: 0,
  }
  
})

const Movie = mongoose.model('Movie', movieSchema) // creating a document in the db


const validateMovie = (movie) => {
  const schema = {
    title: Joi.string().min(2).max(50).required(),
    genreId: JoiObjectId().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()   
  }

  return Joi.validate(movie, schema)
}

module.exports.movieSchema = movieSchema
module.exports.Movie = Movie
module.exports.validate = validateMovie