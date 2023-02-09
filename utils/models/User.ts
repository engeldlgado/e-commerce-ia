import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
},
{
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
