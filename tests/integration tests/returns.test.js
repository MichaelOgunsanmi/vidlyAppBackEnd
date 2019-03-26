const {Rental} = require('../../models/rental')
const mongoose = require('mongoose')



describe('/api/returns', () => {
  let server
  let customerId

  beforeEach( () => { 
    server = require('../../app')
    
    customerId = mongoose.Types.ObjectId()

    const rental = new Rental({
      customer: {
        _id: customerId,
        name:'12345',
        phone: '12345'
      }
    })
  
  
  })
  afterEach( async () => { 
    server.close()  
  })
})