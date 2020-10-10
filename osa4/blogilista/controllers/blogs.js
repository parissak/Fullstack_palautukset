const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!blog.likes) {
        blog.likes = 0
    }

    blog.user = user

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (user.id !== blog.user.toString()) {
        return response.status(403).json({ error: 'unauthorized access' })
    }

    await blog.remove()
    const removeObject = user.blogs.find(b => b.id.toString === request.params.toString())
    user.blogs.splice(removeObject, 1)
    await user.save()
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

blogRouter.post('/:id/comments', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    const comment = request.body.content
    blog.comments = blog.comments.concat(comment)
    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
})

module.exports = blogRouter
