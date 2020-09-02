const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
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

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'test', passwordHash })
    await user.save()
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

test('blog can be deleted', async () => {
    const logger = { username: 'test', password: 'sekret' }
    const loginRes = await api.post('/api/login').send(logger)
    const token = loginRes.body.token

    const deleteMe = {
        title: 'deleteBlog',
        author: 'deleteAuthor',
        url: 'newUrl',
    }

    const res = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(deleteMe)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const idToDelete = res.body.id
    await api
        .delete(`/api/blogs/${idToDelete}`)
        .set('Authorization', `bearer ${token}`)
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

describe('when a new blog is posted', () => {
    let headers

    beforeEach(async () => {
        const logger = { username: 'test', password: 'sekret' }
        const loginRes = await api.post('/api/login').send(logger)
        const token = loginRes.body.token

        headers = {'Authorization': `bearer ${token}`} 
    })

    test('it is saved to the database', async () => {
        const newBlog = {
            title: 'newBlog',
            author: 'newAuthor',
            url: 'newUrl',
        }
        await api
            .post('/api/blogs')
            .set(headers)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(blog => blog.title)
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(titles).toContain(newBlog.title)
    })

    test('it gets zero likes if it does not have likes', async () => {
        const newBlog = {
            title: 'noLikes',
            author: 'noLikesAuthor',
            url: 'likesUrl',
        }
    
        await api
            .post('/api/blogs')
            .set(headers)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        const blog = response.body[initialBlogs.length]
        expect(blog.likes).toBe(0)
    })

    test('400 is returned if it does not have title and url', async () => {
        const logger = { username: 'test', password: 'sekret' }
        const loginRes = await api.post('/api/login').send(logger)
        const token = loginRes.body.token
    
        const newBlog = {
            author: 'noTitleUrl',
        }
    
        await api
            .post('/api/blogs')
            .set(headers)
            .send(newBlog)
            .expect(400)
    })

    test('401 is returned if token is missing from request', async () => {
        const newBlog = {
            title: 'newBlog',
            author: 'newAuthor',
            url: 'newUrl',
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

afterAll(() => {
    mongoose.connection.close()
})