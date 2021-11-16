const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uniqueCaseInsensitive: true
      },
    number: {
        type: String,
        required: true,
        uniqueCaseInsensitive: true
      }
  })

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

noteSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Note', noteSchema)