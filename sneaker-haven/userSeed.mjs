//const { connectToDB } = require('./database')
import mongoose from 'mongoose'
import { config } from 'dotenv'
import bcrypt from 'bcrypt'

config()

let isConnected = false

const userObject = {
  email: 'snassabi0@gmail.com',
  username: 'shawn_nassabi',
  password: '123456',
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'], // message is for when it fails
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
})

// This line is needed because next backend isn't always running
// when it does run, it will need to check the existing models in models
// if models.User exists then just use that, otherwise create the Schema

const connectToDB = async () => {
  mongoose.set('strictQuery', true)
  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'sneaker_haven',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
  }
}

async function main() {
  //console.log(process.env.MONGODB_URI)
  let connected = await connectToDB()
  const User = mongoose.models.User || mongoose.model('User', UserSchema)
  try {
    const hashedPassword = await bcrypt.hash(userObject.password, 10) // Hash the password before saving to the database

    const userObj = new User({
      email: userObject.email,
      username: userObject.username,
      password: hashedPassword,
    })

    const savedUser = await userObj.save()
    console.log('User added to the database:', savedUser)
  } catch (error) {
    console.error('Failed to add user to the database:', error)
  }
}

main()
