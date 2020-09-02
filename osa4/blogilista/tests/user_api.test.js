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

    const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    expect(res.body.error).toContain('`username` is required')
})

test('new user without password returns 400 and error message', async () => {
    const newUser = {
        username: 'noPass',
        name: 'noPass',
        password: '',
    }

    const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    expect(res.body.error).toContain('password too short')
})

test('new user without long enough username returns 400 and error message', async () => {
    const newUser = {
        username: 'su',
        name: 'shortUsername',
        password: 'shortUsername',
    }

    const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    expect(res.body.error).toContain('is shorter than the minimum allowed length')
})

test('new user without long enough password returns 400 and error message', async () => {
    const newUser = {
        username: 'shortPW',
        name: 'shortPW',
        password: 'PW',
    }

    const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    expect(res.body.error).toContain('password too short')

})

afterAll(() => {
    mongoose.connection.close()
})