const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { init } = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'testOne',
        author: 'testOneAuthor',
        url: 'urlOne',
        likes: 1
    },
    {
        title: 'testTwo',
        author: 'testTwoAuthor',
        url: 'urlTwo',
        likes: 2
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('amount of returned blogs is correct', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('id of blog object is in correct form', async () => {
    const response = await api.get('/api/blogs')
    const objectId = response.body[0].id
    expect(objectId).toBeDefined()
})

test('new blog can be added', async () => {
    const newBlog = {
        title: 'newBlog',
        author: 'newAuthor',
        url: 'newUrl',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
})

test('new blog without likes has zero likes', async () => {
    const newBlog = {
        title: 'noLikes',
        author: 'noLikesAuthor',
        url: 'likesUrl',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blog = response.body[initialBlogs.length]
    expect(blog.likes).toBe(0)
})

test('new blog without title and url returns 400', async () => {
    const newBlog = {
        author: 'noTitleUrl',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('blog can be deleted', async () => {
    const deleteMe = {
        title: 'deleteBlog',
        author: 'deleteAuthor',
        url: 'newUrl',
    }

    const res = await api
        .post('/api/blogs')
        .send(deleteMe)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const idToDelete = res.body.id
    await api
        .delete(`/api/blogs/${idToDelete}`)
        .expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs likes can be updated', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    const likes = 666
    firstBlog.likes = likes

    await api
        .post(`/api/blogs/${firstBlog.id}`)
        .send(firstBlog)

    const blogs = await api.get('/api/blogs')
    const firsBlog = blogs.body[0]
    expect(firstBlog.likes).toBe(666)
})

afterAll(() => {
    mongoose.connection.close()
})