const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()

userRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password.length === 0 || body.password.length < 3) {
        return response.status(400).json({ error: 'password too short' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users.map(u => u.toJSON()))
})

userRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

userRouter.put('/:id', async (request, response) => {
    const body = request.body

    const user = {
        username: body.username,
        name: body.name,
    }

    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
    response.json(updatedUser)
})

module.exports = userRouter