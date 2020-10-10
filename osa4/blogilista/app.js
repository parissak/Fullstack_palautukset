
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

logger.info('connecting to', config.mongoUrl)

app.use(cors())
app.use(express.static('build'))
 
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.get('*', function(request, response) {
    response.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use(middleware.errorHandler)

module.exports = app