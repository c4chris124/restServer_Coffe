import mongoose from "mongoose"

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Database Online")
  } catch (error) {
    console.error(error)
    throw new Error("Error initializing database")
  }
}

export default dbConnection
