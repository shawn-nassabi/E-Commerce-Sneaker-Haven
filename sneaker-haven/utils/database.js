import mongoose from 'mongoose'

/*
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sneaker_haven",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
*/

let cachedConnection = global.mongoose

if (!cachedConnection) {
  cachedConnection = global.mongoose = { conn: null }
}

export const dbConnect = async () => {
  if (cachedConnection.conn) return cachedConnection.conn

  cachedConnection.conn = await mongoose.connect(process.env.MONGODB_URI)

  return cachedConnection.conn
}
