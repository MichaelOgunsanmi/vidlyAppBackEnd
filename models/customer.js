const mongoose = require('mongoose') // for db work
const Joi = require('joi')   // for input validation 


const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 11
  },
  isGold: {
    type: Boolean,
    default: false,
  }
  
})

const Customer = mongoose.model('Customer', customerSchema) // creating a document in the db


const validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(5).max(11).required(),
    isGold: Joi.bool()
  }

  return Joi.validate(customer, schema)
}

module.exports.customerSchema = customerSchema
module.exports.Customer = Customer
module.exports.validate = validateCustomer