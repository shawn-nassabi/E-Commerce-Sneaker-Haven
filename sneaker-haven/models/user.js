import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
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
const User = models.User || model('User', UserSchema)

export default User
