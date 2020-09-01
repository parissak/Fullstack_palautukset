const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})

test('new user without username returns 400', async () => {
    const newUser = {
        name: 'noUsername',
        password: 'noUsername',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('new user without long enough username returns 400', async () => {
    const newUser = {
        username: 'su',
        name: 'shortUsername',
        password: 'shortUsername',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('new user without password returns 400', async () => {
    const newUser = {
        username: 'noPass',
        name: 'noPass',
        password: '',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('new user without long enough password returns 400', async () => {
    const newUser = {
        username: 'shortPW',
        name: 'shortPW',
        password: 'PW',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})