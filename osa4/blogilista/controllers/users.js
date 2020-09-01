const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()

userRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (body.password.length === 0) {
        return response.status(400).json({ error: 'password missing' })
    } else
        if (body.password.length < 3) {
            return response.status(400).json({ error: 'password too short' })
        }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users.map(u => u.toJSON()))
})

userRouter.delete('/:id', async (request, response, next) => {
    try {
        await User.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

userRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const user = {
        username: body.username,
        name: body.name,
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
        response.json(updatedUser)
    } catch (exception) {
        next(exception)
    }
})

module.exports = userRouter