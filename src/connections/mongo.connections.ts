import mongoose from 'mongoose'

export default class MongoConnection {
  public static connect() {
    mongoose.connect(String(process.env.MONGODB_URI))
  }
}
