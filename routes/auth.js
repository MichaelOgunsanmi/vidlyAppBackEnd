const mongoose = require('mongoose') // for db work
const express = require('express')   // for api work
const router = express.Router()      // linking user route to app.js 
const {User} = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')



router.post('/', async (req, res) => {
  const {error}   = validate(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if(!user) return res.status(400).send('Invalid email or password') 

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) return res.status(400).send('Invalid email or password')

  const token = user.generateAuthToken()

  res.send(token)
})

const validate = (req) => {
  const schema = {
    email: Joi.string().min(8).max(50).required().email(),
    password: Joi.string().min(5).max(255).required(),
  }

  return Joi.validate(req, schema)
}



module.exports = router