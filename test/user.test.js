const request = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOneToken = jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)

const userOne = {
  _id: userOneId,
  name: 'ding',
  email: 'ding@gmail.com',
  password: 'dingdong',
  tokens: [
    {
      token: userOneToken,
    },
  ],
}

// we have to empty the database before each test and create a user
beforeAll(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

test('create a user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'saad',
      email: 'saadgfx97@gmail.com',
      password: 'sdafagaga',
    })
    .expect(201)

  // assertion on the database
  const user = await User.findById(userOneId)
  expect(user.tokens[0].token).toBe(userOne.tokens[0].token)
})

test('user should login', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200)

  // testing the token returned is token saved in database
  const user = await User.findById(userOneId)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login the non existent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'dingdong@gmail.com',
      password: 'dasd',
    })
    .expect(400)
})

test('login should fail due to invalid credentials', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: 'dasd',
    })
    .expect(400)
})

test('should not get profile for unauthenticated user', async () => {
  await request(app).get('/users/me').send().expect(401)
})

test('should get profile for authenticated user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('user can delete the account', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  // test that user is deleted from database
  const user = await User.findById(userOneId)
  expect(user)
})

test('unauthorized user cannot delete the account', async () => {
  await request(app).delete('/users/me').send().expect(401)
})
