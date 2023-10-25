import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const getMongoString = () => {
  const {MONGO_HOST, MONGO_PORT, MONGO_DATABASE} = process.env;
  return 'mongodb://' +
    MONGO_HOST +
    ':' +
    MONGO_PORT +
    '/' +
    MONGO_DATABASE;
}

export const connect = async () => {
  try {
    await mongoose.connect(getMongoString())
  } catch (error) {
    throw error
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected")
})
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected")
})