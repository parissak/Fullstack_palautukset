const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: { type: String },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number }
})

blogSchema.set('toJSON', {
  transform: (documents, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)