import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.promise = global.Promise

const ProductSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: String
  },
  gallery: [
    {
      type: String
    }
  ],
  contact: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now // current date
  }
})

ProductSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)
