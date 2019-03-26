const Joi = require('joi')
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20
  },
  date: { type: Date, default: Date.now}
})

const Genre = mongoose.model('Genre', genreSchema)

const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(5).max(20).required()
  }

  return Joi.validate(genre, schema)
}

module.exports.Genre = Genre
module.exports.validate = validateGenre
module.exports.genreSchema = genreSchema