 const request = require('supertest')
 const {User} = require('../../../models/user')
 const {Genre} = require('../../../models/genre')

 describe('auth middleware', () => {
  beforeEach( () => { server = require('../../../app') })
  afterEach( async () => {  
    await Genre.deleteOne({}) 
    await server.close()  
  })

  let token 

  const execute = async () => {
    return await request(server)
    .post('/api/genres')
    .set('x-auth-token', token)
    .send({ name: 'genre1' })
  }
  

  beforeEach( () => {
    token = new User().generateAuthToken()
  })  
  

  it('should return a 401 if no token is provided', async () => {
    token = ''

    const res = await execute()

    expect(res.status).toBe(401)
  })


  it('should return a 400 if token is invalid', async () => {
    token = 'a'

    const res = await execute()

    expect(res.status).toBe(400)
  })



  it('should return a 200 if token is valid', async () => {

    const res = await execute()

    expect(res.status).toBe(200)
  })


 })