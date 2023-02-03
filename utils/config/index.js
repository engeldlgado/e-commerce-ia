const mongoose = require('mongoose')

const mongoData = process.env.MONGO_URI

const connectMongo = async () => {
  mongoose.set('strictQuery', false) // prevent deprecation warning for next update of mongoose
  try {
    await mongoose.connect(mongoData)
    console.log('CONNECTED TO MONGO')
    process.on('warning', e => console.warn(e.stack))
  } catch (error) {
    console.log(error)
    console.log('FAILED TO CONNECT TO MONGO')
    process.exit(1)
  }
}

connectMongo()

module.exports = connectMongo
