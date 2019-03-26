const mongoose = require('mongoose') // for db work
const Joi = require('joi')   // for input validation 
const jwt = require('jsonwebtoken')
const config = require('config')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 8,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
  
})


userSchema.methods.generateAuthToken = function () {
   
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))
  return token 
}

const User = mongoose.model('User', userSchema) // creating a document in the db


const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(8).max(50).required().email(),
    password: Joi.string().min(5).max(255).required(),
  }

  return Joi.validate(user, schema)
}

module.exports.User = User
module.exports.validate = validateUser